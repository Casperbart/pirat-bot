const Discord = require('discord.js');
const { alphabet, unknown }  = require('../assets/alphabet.js');

module.exports = {
    name: 'sprog',
    aliases: [''],
    description: "",
    requireArgs: false,
    usage: "",
    execute(msg, args) {
        var secretMessage = [...args].length > 0 ? [...args].join(' ') : "";
        console.log(`Preserved args: ${secretMessage}`);

        var codeMessage = '';
        for(char of secretMessage.toLowerCase())
        {
            if(alphabet.hasOwnProperty(char)) 
            {
                codeMessage += alphabet[char];
            } else 
            {
                codeMessage += unknown;
            }
        }
        
        msg.reply(codeMessage);
    }
};