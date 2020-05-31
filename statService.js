const { CosmosClient } = require("@azure/cosmos");

const prefix = process.env.PREFIX;
const connectionString = process.env.COSMOSCONNECTIONSTRING;
const containerID = process.env.COSMOSCONTAINER;

const endpoint = "https://pirat-bot-db.documents.azure.com:443/";
const client = new CosmosClient(connectionString);

module.exports.StatService = {
    process: async function (msg) {
        console.log("Processing stats");

        const { database } = await client.databases.createIfNotExists({ id: 'PiratBotStats' });
        const { container } = await database.containers.createIfNotExists({ id: containerID });

        var fetchedUser = await this.getUser(msg.author.id);
     
        var user =  fetchedUser ? fetchedUser : {
            id: '',
            user: msg.author.id,
        };

        user.username = msg.author.username;
        
        // Count how many messages the user has sent
        if(user.messageCount && Number.isInteger(user.messageCount)) {
            user.messageCount += 1;
        } else {
            user.messageCount = 1;
        }

        if(isBotCommand(msg)) {
            // Count how many bot commands the user has sent
            if(user.botCommandCount && Number.isInteger(user.botCommandCount)) {
                user.botCommandCount += 1;
            } else {
                user.botCommandCount = 1;
            }

            // Register the latest bot command executed by user
            const mostRecent = mostRecentCommand(msg);
            if(mostRecent && !isEmpty(mostRecent)) {
                user.mostRecentCommand = mostRecent;
            }
        }

        // Register the timestamp of the users latest message
        const timestamp = messageTimestamp(msg);
        if(timestamp) {
            user.latestMessageTimestamp = timestamp
        }

        const emojiCount = estimateEmojiCount(msg);
        if(emojiCount && emojiCount > 0) {
            if(user.estimatedEmojiCount && Number.isInteger(user.estimatedEmojiCount)) {
                user.estimatedEmojiCount += emojiCount;
            } else {
                user.estimatedEmojiCount = emojiCount;
            }
        }

        container.items.upsert(user)
    },
    getUser: async function(id) {
        const { database } = await client.databases.createIfNotExists({ id: 'PiratBotStats' });
        const { container } = await database.containers.createIfNotExists({ id: containerID });

        // query to return all items
        const querySpec = {
            query: "SELECT * from c WHERE c.user = @author",
            parameters: [
                {
                  name: "@author",
                  value: id
                }
            ]
        };

        const { resources: users } = await container.items
            .query(querySpec)
            .fetchAll();

        if(users.length > 0) {
            return users[0];
        } else {
            return null;
        }
    },
    storeQuizScore: async function(user) {
        const { database } = await client.databases.createIfNotExists({ id: 'PiratBotStats' });
        const { container } = await database.containers.createIfNotExists({ id: containerID });

        container.items.upsert(user)
    }
};

function isBotCommand(msg) {
    if(msg.content.startsWith(prefix)) {
        return true;
    }

    return false;
}

function mostRecentCommand(msg) {
    var recent = '';
    // Fjerner !pirat fra beskeden, og laver et array med kommando og argumenter
    var args = msg.content.slice(prefix.length).split(' ');
    // Fjerner mellemrum fra vores array
    args = args.filter(el => !isEmpty(el));
    
    if(args && args.length > 0) {
      // Først element i array er vores kommando
      // Med shift() fjerner vi kommandoen fra vores array og gemmer den i en variabel
      const commandName = args.shift().toLowerCase();
      recent = `${prefix} ${commandName}`;
    }

    return recent;
}

function messageTimestamp(msg) {
    return msg.createdTimestamp;
}


/*
    0x1F600...0x1F64F, // Emoticons
    0x1F300...0x1F5FF, // Misc Symbols and Pictographs
    0x1F680...0x1F6FF, // Transport and Map
    0x2600...0x26FF,   // Misc symbols
    0x2700...0x27BF,   // Dingbats
    0xFE00...0xFE0F,   // Variation Selectors
    0x1F900...0x1F9FF, // Supplemental Symbols and Pictographs
    0x1F1E6...0x1F1FF
*/
function estimateEmojiCount(msg) {
    let str = msg.content;

    // Emojis are annoying so the following replace statement is not perfect for emoji couting (doesn't like glyphs composed of multiple emoji codepoints)
    let freq = {};
    str.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}]/gu, char => freq[char] = (freq[char] || 0) + 1);

    console.dir(freq)
    var count = 0;
    for(const emojiCount of Object.values(freq)) {
        count += emojiCount;
    }
    return count;
}

function isEmpty(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
  }
