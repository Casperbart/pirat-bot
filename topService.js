const { CosmosClient } = require("@azure/cosmos");

const prefix = process.env.PREFIX;
const connectionString = process.env.COSMOSCONNECTIONSTRING;
const containerID = process.env.COSMOSCONTAINER;

const endpoint = "https://pirat-bot-db.documents.azure.com:443/";
const client = new CosmosClient(connectionString);

module.exports.TopService = {
    getUsers: async function(id) {
        const { database } = await client.databases.createIfNotExists({ id: 'PiratBotStats' });
        const { container } = await database.containers.createIfNotExists({ id: containerID });

        // query to return all items
        const querySpec = {
            query: "SELECT * from c"
        };

        const { resources: users } = await container.items
            .query(querySpec)
            .fetchAll();

        if(users.length > 0) {
            return users;
        } else {
            return null;
        }
    },
    topEmoji: function(users) {
        // Find users with a value for estimated emoji count
        // Map user to a TopList item
        // Order list of items by who has sent most emojis
        return users.filter(u => u.estimatedEmojiCount) 
            .map(u => this.userToTopListItem(u, u.estimatedEmojiCount))
            .sort((user1, user2) => user2.score - user1.score)
    },
    topMessageCount: function(users) {
        return users.filter((u) => u.messageCount) 
            .map(u => this.userToTopListItem(u, u.messageCount))
            .sort((user1, user2) => user2.score - user1.score)
    },
    topBotCount: function(users) {
        return users.filter((u) => u.botCommandCount) 
            .map(u => this.userToTopListItem(u, u.botCommandCount))
            .sort((user1, user2) => user2.score - user1.score)
    },
    userToTopListItem: function(user, score) {
        return {
            username: user.username,
            score: score
        }
    }
};