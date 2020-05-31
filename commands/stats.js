const Discord = require('discord.js');
const { StatService } = require('../statService.js');
var moment = require('moment');
moment.locale('da');
moment.relativeTimeThreshold('d', 365)

module.exports = {
    name: 'stats',
    aliases: [''],
    description: "Stats kommando",
    requireArgs: false,
    usage: "",
    async execute(msg, args) {
        var user = await StatService.getUser(msg.author.id);
        if(user) {
            const embed = new Discord.MessageEmbed()
                .setTitle(user.username)
                .setColor('#6bcdf4')
                .addField('Antal beskeder sendt', user.messageCount ? `${user.messageCount} ⬆️` : 'Her endnu ikke sendt en besked', false)
                .addField('Antal emojis sendt (cirka)', user.estimatedEmojiCount ? user.estimatedEmojiCount : 'Har ikke sendt emojis endnu 💩', false)
                .addField('Antal Piratbot kommandoer sendt', user.botCommandCount ? `${user.botCommandCount} ⬆️` : 'Har ikke brugt en Piratbot kommando endnu 🥺', true)
                .addField('Seneste kommando', user.mostRecentCommand ? user.mostRecentCommand : '❌', true)
                .addField('Tidspunkt for seneste besked', user.latestMessageTimestamp ? moment(user.latestMessageTimestamp).fromNow() : '❌', false)
                .addField('Quiz highscore', user.quizHighScore ? `${user.quizHighScore} 🏆` : 'Har ikke spillet PiratBot quizzen endnu', false)

            msg.channel.send(embed);
        } else {
            msg.channel.send(`Could not find stats for user ${msg.author.id}`)
        }
    }
};