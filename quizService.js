const Discord = require('discord.js');
var moment = require('moment');

const { CosmosClient } = require("@azure/cosmos");
const { StatService } = require('./statService.js');

const prefix = process.env.PREFIX;
const connectionString = process.env.COSMOSCONNECTIONSTRING;
const containerID = process.env.QUIZCONTAINER;

const endpoint = "https://pirat-bot-db.documents.azure.com:443/";
const client = new CosmosClient(connectionString);

module.exports.QuizService = {
    gameModel: function() {
        return {
            id: '',
            user: '',
            questionsAnswered: [],
            currentQuestion: 0,
            points: 0,
            startTime: '',
            endTime: '',
            state: ''
        }
    },
    gameLength: 2,
    pointsPerQuestion: 500,
    questions: 
    [
        {
            id: "1",
            description: "Hvornår udkom den første Star Wars film?",
            answer: "a",
            choice1: "A. 1977",
            choice2: "B. 1980",
            choice3: "C. 1999",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/250px-Star_Wars_Logo.svg.png"
        },
        {
            id: "2",
            description: "Hvem har lavet Minecraft?",
            answer: "c",
            choice1: "A. Epic Games",
            choice2: "B. Valve",
            choice3: "C. Mojang",
            image: "https://logos-world.net/wp-content/uploads/2020/04/Minecraft-Logo.png"
        },
        {
            id: "3",
            description: "Hvilket øgenavn har skaberen af Minecraft?",
            answer: "a",
            choice1: "A. Notch",
            choice2: "B. Duck",
            choice3: "C. Hammer",
            image: "https://logos-world.net/wp-content/uploads/2020/04/Minecraft-Logo.png"
        },
        {
            id: "4",
            description: "Hvilket år udkom Minecraft(Version 1.0)?",
            answer: "b",
            choice1: "A. 2015",
            choice2: "B. 2011",
            choice3: "C. 2008",
            image: "https://logos-world.net/wp-content/uploads/2020/04/Minecraft-Logo.png"
        },
        {
            id: "5",
            description: "Hvad hedder de grønne monstre der exploderer?",
            answer: "a",
            choice1: "A. Creeper",
            choice2: "B. Bomber",
            choice3: "C. Nuker",
            image: "https://logos-world.net/wp-content/uploads/2020/04/Minecraft-Logo.png"
        },
        {
            id: "6",
            description: "Hvad hedder hovedpersonen med den røde hat og overskæg?",
            answer: "c",
            choice1: "A. Bowser",
            choice2: "B. Luigi",
            choice3: "C. Mario",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mario_Series_Logo.svg/1200px-Mario_Series_Logo.svg.png"
        },
        {
            id: "7",
            description: "Hvad hedder Mario,s bror med den grønne hat og overskæg?",
            answer: "b",
            choice1: "A. Bowser",
            choice2: "B. Luigi",
            choice3: "C. Mario",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mario_Series_Logo.svg/1200px-Mario_Series_Logo.svg.png"
        },
        {
            id: "8",
            description: "Hvad hedder Mario,s ærkerivalen?",
            answer: "a",
            choice1: "A. Bowser",
            choice2: "B. King Croc",
            choice3: "C. Lord Bee",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mario_Series_Logo.svg/1200px-Mario_Series_Logo.svg.png"
        },
        {
            id: "9",
            description: "Hvad hedder svampen som ofte ender i problemer og kan godt lide at grave?",
            answer: "c",
            choice1: "A. Bowser",
            choice2: "B. Luigi",
            choice3: "C. Toad",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mario_Series_Logo.svg/1200px-Mario_Series_Logo.svg.png"
        },
        {
            id: "10",
            description: "Hvad hedder prisessen som næsten altid bliver fanget af Bowser?",
            answer: "b",
            choice1: "A. Maria",
            choice2: "B. Peach",
            choice3: "C. Isabella",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mario_Series_Logo.svg/1200px-Mario_Series_Logo.svg.png"
        },
        {
            id: "11",
            description: "Hvad hedder spillet hvor Luigi fanger spøgelser?",
            answer: "c",
            choice1: "A. Luigi,s Hotel",
            choice2: "B. Luigi,s House",
            choice3: "C. Luigi,s Mansion",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mario_Series_Logo.svg/1200px-Mario_Series_Logo.svg.png"
        },
        {
            id: "12",
            description: "Hvilket år udkom Super Mario Bros til NES?",
            answer: "a",
            choice1: "A. 1985",
            choice2: "B. 1990",
            choice3: "C. 1980",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mario_Series_Logo.svg/1200px-Mario_Series_Logo.svg.png"
        },
        {
            id: "13",
            description: "Hvad hedder spillet hvor Mario og de andre kører i gokart?",
            answer: "a",
            choice1: "A. Mario Kart",
            choice2: "B. Luigi Kart",
            choice3: "C. Mario Racing",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mario_Series_Logo.svg/1200px-Mario_Series_Logo.svg.png"
        },
        {
            id: "14",
            description: "Hvad hedder spillet hvor verdenen er lavet af papir?",
            answer: "c",
            choice1: "A. Cardboard Mario",
            choice2: "B. Newsletter Mario",
            choice3: "C. Paper Mario",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mario_Series_Logo.svg/1200px-Mario_Series_Logo.svg.png"
        },
        {
            id: "15",
            description: "Mario,s første optræden var i Donkey Kong - Hvornår udkom det?",
            answer: "c",
            choice1: "A. 1985",
            choice2: "B. 1990",
            choice3: "C. 1981",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mario_Series_Logo.svg/1200px-Mario_Series_Logo.svg.png"
        },
        {
            id: "16",
            description: "Hvilket af disse spil udkom først?",
            answer: "c",
            choice1: "A. Super Mario World",
            choice2: "B. Super Mario Bros",
            choice3: "C. Mario Bros",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mario_Series_Logo.svg/1200px-Mario_Series_Logo.svg.png"
        },
        {
            id: "17",
            description: "Mario udkom i 3D i Super Mario 64 - Hvilket år udkom det?",
            answer: "a",
            choice1: "A. 1996",
            choice2: "B. 1990",
            choice3: "C. 2000",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Mario_Series_Logo.svg/1200px-Mario_Series_Logo.svg.png"
        }
    ],
    process: async function (msg, args) {
        console.log("Quizzing");
        console.log(args)

        const { database } = await client.databases.createIfNotExists({ id: 'PiratBotStats' });
        const { container } = await database.containers.createIfNotExists({ id: containerID });

        var fetchedGame = await this.getGameForUser(msg.author.id);
     
        var game =  fetchedGame ? fetchedGame : this.gameModel();
        game.user = msg.author.id;

        if(args.length > 0) {
            console.log(`Current arg: ${args[0].toLowerCase()}`)
            switch (args[0].toLowerCase()) {
                case 'new':
                    if(game.state !== 'active') {
                        game = this.startNewGame(game, msg);
                    } else {
                        var question = this.getQuestionForId(game.currentQuestion);
                        var embed = this.getQuestionEmbed(game, question);
                        msg.reply(embed);
                    }
                    break;
                case 'a':
                case 'b':
                case 'c':
                    if(game.state === 'active') 
                        this.answerQuestion(game, args[0], msg)
                    else {
                        var embed = this.getNoActiveGameEmbed();
                        msg.reply(embed)
                    }
                    break;
                default:
                    console.log('No quiz command for arg')
            }
        } else {
            var embed = this.getNoActiveGameEmbed();
            msg.reply(embed)
        }

        container.items.upsert(game)
    },
    getGameForUser: async function(id) {
        const { database } = await client.databases.createIfNotExists({ id: 'PiratBotStats' });
        const { container } = await database.containers.createIfNotExists({ id: containerID });

        // query to return all items
        const querySpec = {
            query: "SELECT * from c WHERE c.user = @author ORDER BY c.startTime DESC",
            parameters: [
                {
                  name: "@author",
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
    getNewQuestion: function(questionsAnswered) {
        var nextQuestions = this.questions.filter(q => !questionsAnswered.includes(q.id));
        const min = 0;
        const max = nextQuestions.length - 1;
        const rnd = Math.floor(Math.random() * (max - min + 1)) + min;
        
        return nextQuestions[rnd];
    },
    startNewGame: function(game, msg) {
        if(game.state === 'ended') {
            game = this.gameModel();
            game.user = msg.author.id;
        }
        var question = this.getNewQuestion(game.questionsAnswered);
        game.currentQuestion = question.id;
        game.state = 'active';
        game.startTime = moment();

        var embed = this.getQuestionEmbed(game, question);
        msg.reply(embed);
        return game;
    },
    endGame: function(game, msg) {
        game.state = 'ended';
        game.endTime = moment();
        game.points = this.calculateScore(game);
        var embed = this.getEndEmbed(game);
        this.saveScore(game.points, msg.author.id)
        msg.reply(embed);
    },
    saveScore: async function(score, userId) {
        var user = await StatService.getUser(userId);
        if(user.quizHighScore) {
            if(score > user.quizHighScore) {
                user.quizHighScore = score
            }
        } else {
            user.quizHighScore = score;
        }

        await StatService.storeQuizScore(user);
    },
    calculateScore: function(game) {
        // Time bonus
        var timeBonus = 0;
        let elapsedTime = moment(game.endTime).diff(game.startTime, 'seconds')
        // If user answers more than five questions correctly they get a time bonus
        if(game.points >= this.gameLength / 2 * this.pointsPerQuestion) {
            var rate = 0.0;
            if(elapsedTime <= 60) {
                rate = 2.0;
            } else if (elapsedTime <= 90) {
                rate = 1.5;
            } else if (elapsedTime <= 120){
                rate = 1.0;
            } else if (elapsedTime <= 120){ 
                rate = 0.25;
            } else if (elapsedTime <= 150) {
                rate = 0.10;
            } else if (elapsedTime <= 300) {
                rate = 0.5;
            }
            timeBonus = this.pointsPerQuestion * rate;
        }

        return game.points + timeBonus;
    },
    answerQuestion: function(game, choice, msg) {
        var question = this.getQuestionForId(game.currentQuestion);
        if(question.answer === choice.toLowerCase()) {
            game.points += this.pointsPerQuestion;
        }
        game.questionsAnswered.push(game.currentQuestion);
        if(game.questionsAnswered.length === this.gameLength) {
            this.endGame(game, msg);
        } else {
            var question = this.getNewQuestion(game.questionsAnswered);
            if(question) {
                game.currentQuestion = question.id;
                var embed = this.getQuestionEmbed(game, question);
                msg.reply(embed);
            } else {
                this.endGame(game, msg);
            }
        }
    },
    getQuestionForId: function(id) {
        var found =  this.questions.find(q => q.id === id);
        return found
    },
    getQuestionEmbed: function(game, question, username) {
        const embed = new Discord.MessageEmbed()
                .setColor('#6bcdf4')
                .setThumbnail('http://img2.wikia.nocookie.net/__cb20120414165749/batman/images/1/1e/Riddler_DC_Animated.jpg')
                .setAuthor('Quizmaster Lukas 🧙‍♂️', 'https://www.everythingdinosaur.com/wp-content/uploads/2017/05/Mojo_Allosaurus.jpg')
                .setTitle(`Spørgsmål #${game.questionsAnswered.length+1}`)
                .setDescription(question.description)
                .addField('Valgmulighed A', question.choice1, false)
                .addField('Valgmulighed B', question.choice2, false)
                .addField('Valgmulighed C', question.choice3, false)
                .addField('Point', `Du har lige nu ${game.points} point ⬆️`)
                .setFooter(`Indsend dit svar ved at skrive ${prefix} quiz [a, b eller c]`)

        if(!isEmpty(question.image)) {
            embed.setImage(question.image);
        }
        return embed
    },
    getEndEmbed: function(game) {
        const embed = new Discord.MessageEmbed()
            .setColor('#6bcdf4')
            .setThumbnail('http://img2.wikia.nocookie.net/__cb20120414165749/batman/images/1/1e/Riddler_DC_Animated.jpg')
            .setAuthor('Quizmaster Lukas 🧙‍♂️', 'https://www.everythingdinosaur.com/wp-content/uploads/2017/05/Mojo_Allosaurus.jpg')
            .setTitle('Spillet er slut 🎉')
            .setDescription('Spillet er slut. Du kan prøve quizzen igen og se om du kan slå din egen score')
            .addField('Point', `${game.points} 🏆`, false)
            .addField('Længde af spil', `${moment(game.endTime).diff(game.startTime, 'seconds')} sekunder`, false)
            .setFooter(`For at spille igen skriv ${prefix} quiz new`)
        return embed
    },
    getNoActiveGameEmbed: function() {
        const embed = new Discord.MessageEmbed()
            .setColor('#6bcdf4')
            .setThumbnail('http://img2.wikia.nocookie.net/__cb20120414165749/batman/images/1/1e/Riddler_DC_Animated.jpg')
            .setAuthor('Quizmaster Lukas 🧙‍♂️', 'https://www.everythingdinosaur.com/wp-content/uploads/2017/05/Mojo_Allosaurus.jpg')
            .setTitle('Ingen aktiv quiz')
            .setDescription(`Du er ikke startet på et spil endnu. \n For at starte et spil skriv ${prefix} quiz new`)
        return embed
    }
};

function isEmpty(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}
