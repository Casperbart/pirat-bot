const Discord = require('discord.js');
const { HangmanService } = require('../hangmanService.js');

module.exports = {
    name: 'hang',
    aliases: [''],
    description: "Hangman command",
    requireArgs: false,
    usage: "",
    async execute(msg, args) {
        await HangmanService.process(msg, args);
    }
};