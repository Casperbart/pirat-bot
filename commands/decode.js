const Discord = require('discord.js');
const { alphabet, unknown }  = require('../assets/alphabet.js');

module.exports = {
    name: 'decode',
    aliases: [''],
    description: "",
    requireArgs: false,
    usage: "",
    execute(msg, args) {
        var secretMessage = [...args].length > 0 ? [...args].join(' ') : "";
        console.log(`Preserved args: ${secretMessage}`);

        var reverseAlphabet = Object.fromEntries(Object.entries(alphabet).map(a => a.reverse()));
        
        console.dir(reverseAlphabet)

        var codeMessage = '';
        for(var char of secretMessage)
        {
            console.log(char);
            console.log(char.split('').reverse().join(''))
            if(reverseAlphabet[char] != null) 
            {
                codeMessage += reverseAlphabet[char];
            } else 
            {
                codeMessage += ' ';
            }
        }
        
        msg.reply(codeMessage);
    }
};