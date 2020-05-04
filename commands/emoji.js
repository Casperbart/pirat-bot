const Discord = require('discord.js');
const { alphabet, unknown } = require('../assets/alphabet.js');

module.exports = {
    name: 'emoji',
    aliases: [''],
    description: "Lav dit navn om til emojis",
    requireArgs: false,
    usage: "",
    execute(msg, args) {
        var emojiName = "Her er dit emojinavn: ";

        for(char of msg.author.username.toLowerCase())
        {
            if(alphabet.hasOwnProperty(char)) 
            {
                emojiName += alphabet[char];
            } else 
            {
                emojiName += unknownCharacter;
            }
        }
        
        msg.reply(emojiName);
    }
};