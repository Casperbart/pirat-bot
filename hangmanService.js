const Discord = require('discord.js');
var moment = require('moment');

const { CosmosClient } = require("@azure/cosmos");

const prefix = process.env.PREFIX;
const connectionString = process.env.COSMOSCONNECTIONSTRING;
const containerID = process.env.HANGMANCONTAINER;

const endpoint = "https://pirat-bot-db.documents.azure.com:443/";
const client = new CosmosClient(connectionString);

module.exports.HangmanService = {
    gameModel: function() {
        return {
            id: '',
            channel: '',
            guesses: [],
            letters: [],
            currentWord: '',
            difficulty: 0,
            startTime: '',
            endTime: '',
            state: ''
        }
    },
    maxAttempts: 10,
    words: {
        easy: [
            "hund", "kat", "sand", "vand", "fugl", "hus", "træ", "kat", "mor", "far", "skole", "sol", "mand", "baby", "dreng", "pige", "hjem", "sol", "hvid", "sjovt", "hus", "tid", "tid", "dør", "luft", "vand", "dyr", "gård", "hånd", "brev", "zoo", "sten", "bog", "mælk", "stol", "bro", "vej", "ovn", "brød", "kunst"
        ],
        medium: [
            "alien", "marsbar", "appelsin", "månen", "kærlighed", "penge", "morgen", "gade", "søster", "musik", "lastbil", "konge", "person", "butik", "cykel", "killing", "haven", "løve", "monster", "vindue", "verden", "hustru", "ugle"
        ],
        hard: [
            "Speciallægepraksisplanlægningsstabiliseringsperiode", "bondegård","appelsin","bilindustrien","værelse","fødevarer","fødselsdag","bedstefar","matematik"
        ]
    },
    process: async function (msg, args) {
        console.log("Hanging out with the man");
        console.log(args)

        const { database } = await client.databases.createIfNotExists({ id: 'PiratBotStats' });
        const { container } = await database.containers.createIfNotExists({ id: containerID });

        var fetchedGame = await this.getGameForChannel(msg.channel.id);
     
        var game =  fetchedGame ? fetchedGame : this.gameModel();
        game.channel = msg.channel.id;

        if (args.length > 0) {
            let firstArg = args[0].toLowerCase();
            console.log(`Current arg: ${firstArg}`)
            if (args[0].toLowerCase() === 'start') { // Start new game
                if(game.state !== 'active') {
                    let difficulty = args[1];
                    if(difficulty && (difficulty == 1 || difficulty == 2 || difficulty == 3)) {
                        game = this.startNewGame(game, difficulty, msg);
                    } else {
                        msg.channel.send(`Vælg mellem sværhedsgrad 1 (let), 2 (medium) eller 3 (svær). \nSkriv ${prefix} hang start [sværhedsgrad]`)
                    }
                } else { // A game is already active so return current game
                    var embed = this.getGameEmbed(game);
                    msg.channel.send(embed);
                }
            } else if (firstArg.length === 1) { // Guess a letter
                if(game.state === 'active') {
                    game = this.letterGuess(game, firstArg, msg)
                } else {
                    var embed = this.getNoActiveGameEmbed();
                    msg.channel.send(embed)
                }
            } else if (firstArg.length > 1) { // Guess the word
                if(game.state === 'active') {
                    this.wordGuess(game, firstArg, msg)
                } else {
                    var embed = this.getNoActiveGameEmbed();
                    msg.channel.send(embed)
                }
            } else {
                console.log('No hangman command for arg')
            }
        } else {
            if(game.state === 'active') {
                var embed = this.getGameEmbed(game);
                msg.channel.send(embed);
            } else {
                var embed = this.getNoActiveGameEmbed();
                msg.channel.send(embed)
            }
        }

        if(!isEmpty(game.state))
            container.items.upsert(game)
    },
    getGameForChannel: async function(id) {
        const { database } = await client.databases.createIfNotExists({ id: 'PiratBotStats' });
        const { container } = await database.containers.createIfNotExists({ id: containerID });

        // query to return all items
        const querySpec = {
            query: "SELECT * from c WHERE c.channel = @channel ORDER BY c.startTime DESC",
            parameters: [
                {
                  name: "@channel",
                  value: id
                }
            ]
        };

        const { resources: games } = await container.items
            .query(querySpec)
            .fetchAll();

        if(games.length > 0) {
            return games[0];
        } else {
            return null;
        }
    },
    getNewWord: function(difficulty) {
        var words = []
        
        if(difficulty === '1') 
            words = this.words.easy
        else if(difficulty === '2')
            words = this.words.medium
        else if(difficulty === '3')
            words = this.words.hard
            
        const min = 0;
        const max = words.length - 1;
        const rnd = Math.floor(Math.random() * (max - min + 1)) + min;
        
        return words[rnd];
    },
    startNewGame: function(game, difficulty, msg) {
        if(game.state === 'ended') {
            game = this.gameModel();
            game.channel = msg.channel.id;
        }
        var word = this.getNewWord(difficulty);
        game.currentWord = word;
        game.state = 'active';
        game.startTime = moment();

        var embed = this.getGameEmbed(game);
        msg.channel.send(embed);
        return game;
    },
    letterGuess: function(game, letter, msg) {
        let attemptsLeft = this.maxAttempts - game.letters.length;
        if(attemptsLeft > 0) {
            game.letters.push(letter);
        }
        
        var embed = this.getGameEmbed(game);
        msg.channel.send(embed);
        return game;
    },
    wordGuess: function (game, guess, msg) {
        let attemptsLeft = this.maxAttempts - game.letters.length;
        let normalizedGuess = guess.toLowerCase();
        game.guesses.push(normalizedGuess);
        if(attemptsLeft <= 0) {
            if(this.checkGuess(game, normalizedGuess)) {
                var embed = this.getWinEmbed(game);
                msg.channel.send(embed);
            } else {
                var embed = this.getLostEmbed(game);
                msg.channel.send(embed);
            }
            game = this.endGame(game);
        } else {
            if(this.checkGuess(game, normalizedGuess)) {
                var embed = this.getWinEmbed(game);
                msg.channel.send(embed);

                game = this.endGame(game);
            } else {
                // Wrong guess embed
                var embed = this.getGameEmbed(game);
                msg.channel.send(embed);
            }
        }
        return game;
    },
    checkGuess: function(game, guess) {
        return game.currentWord === guess;
    },
    endGame: function(game) {
        game.state = 'ended';
        game.endTime = moment();
        return game;
    },
    getHiddenWordString: function(word, letters) {
        let wordArray = [...word];
        var hiddenWord = ''
        for (const letter of wordArray) {
            if (letters.includes(letter)) {
                hiddenWord += ` ${letter} `;
            } else {
                hiddenWord += ' ⎽ ';
            }
        }
        return hiddenWord;
    },
    getGameEmbed: function(game) {
        let attemptCount = game.letters.length;
        let attempts = game.letters.join(', ');
        let guesses = game.guesses.join(', ');
        let attemptsLeft = this.maxAttempts - attemptCount;

        let hiddenWord = this.getHiddenWordString(game.currentWord, game.letters)
        let fileName = `hang_${attemptCount}.png`;

        var description = `Ord der skal gættes: ${hiddenWord}`;
        if(attemptsLeft === 0) {
            description += `\nDu har brugt dit sidste bogstav. Nu skal du gætte hele ordet.\nSkriv ${prefix} hang [ord] for at gætte ordet`
            fileName = `hang_10.png`; // Use second to last image
        }

        const embed = new Discord.MessageEmbed()
                .setColor('#c6ffc6')
                .setTitle(`Hangman`)
                .setDescription(description)
                .addField('Tidligere bogstaver: ', isEmpty(attempts) ? 'Der er ikke gættet nogle bogstaver endnu' : attempts, false)
                .addField('Tidligere gæt: ', isEmpty(guesses) ? 'Der er ikke gættet nogle ord endnu' : guesses, false)
                .addField('Bogstav gæt tilbage: ', attemptsLeft, false)
                .setFooter(`Gæt et bogstav ved at skrive ${prefix} hang [bogstav]. \nKan du gætte hele ordet så skriv ${prefix} hang [ord]`)
                .attachFiles([`./assets/hang/${fileName}`])
                .setImage(`attachment://${fileName}`);
        return embed
    },
    getWinEmbed: function(game) {
        let attemptCount = game.letters.length;
        let attempts = game.letters.join(', ');
        let guesses = game.guesses.join(', ');

        var description = `I vandt 🎉🎉 Ordet der skulle gættes var: ${game.currentWord}\nI kan prøve igen med en anden sværhedsgrad 1 (let), 2 (medium) eller 3 (svær)`;

        let fileName = `hang_${attemptCount}.png`;
        const embed = new Discord.MessageEmbed()
                .setColor('#c6ffc6')
                .setTitle(`Hangman`)
                .setDescription(description)
                .addField('Tidligere bogstaver: ', isEmpty(attempts) ? 'Der er ikke gættet nogle bogstaver endnu' : attempts, false)
                .addField('Tidligere gæt: ', isEmpty(guesses) ? 'Der er ikke gættet nogle ord endnu' : guesses, false)
                .addField('Forsøg brugt: ', `${attemptCount} ud af ${this.maxAttempts} forsøg`, false)
                .setFooter(`Skriv ${prefix} hang start [sværhedsgrad] for at prøve igen`)
                .attachFiles([`./assets/hang/${fileName}`])
                .setImage(`attachment://${fileName}`);
        return embed
    },
    getLostEmbed: function(game) {
        let attempts = game.letters.join(', ');
        let guesses = game.guesses.join(', ');

        var description = `I tabte... ☠️ Ordet der skulle gættes var: ${game.currentWord}\nI kan prøve igen med en anden sværhedsgrad 1 (let), 2 (medium) eller 3 (svær)`;

        let fileName = `hang_11.png`;
        const embed = new Discord.MessageEmbed()
                .setColor('#c6ffc6')
                .setTitle(`Hangman`)
                .setDescription(description)
                .addField('Tidligere bogstaver: ', isEmpty(attempts) ? 'Der er ikke gættet nogle bogstaver endnu' : attempts, false)
                .addField('Tidligere gæt: ', isEmpty(guesses) ? 'Der er ikke gættet nogle ord endnu' : guesses, false)
                .setFooter(`Skriv ${prefix} hang start [sværhedsgrad] for at prøve igen`)
                .attachFiles([`./assets/hang/${fileName}`])
                .setImage(`attachment://${fileName}`);
        return embed
    },
    getNoActiveGameEmbed: function() {
        const embed = new Discord.MessageEmbed()
            .setColor('#c6ffc6')
            .setTitle('Ingen aktive spil')
            .setDescription(`I har ikke startet et hangman spil i denne kanal endnu.\nFor at starte et spil skriv ${prefix} hang start [sværhedsgrad]`)
        return embed
    }
};

function isEmpty(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}
