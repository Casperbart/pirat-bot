const Discord = require('discord.js');

module.exports = {
    name: 'emoji',
    aliases: [''],
    description: "Lav dit navn om til emojis",
    requireArgs: false,
    usage: "",
    alphabet: {
        a : "😎",
        b : "🥓",
        c : "🤡",
        d : "🎪",
        e : "🐘",
        f : "🌷",
        g : "🕹️",
        h : "🕳️",
        i : "☝",
        j : "🗾",
        k : "⌨",
        l : "💻",
        m : "🌚",
        n : "📰",
        o : "⭕",
        p : "💩",
        q : "🎈",
        r : "🌹",
        s : "☀️",
        t : "🌳",
        u : "👨‍💻",
        v : "🥒",
        w : "🧙‍♂️",
        x : "❌",
        y : "🔥",
        z : "🌟",
        æ : "🤑",
        ø : "👨‍",
        å : "🌊" ,
        "1" : "⌛",
        "2" : "💿",
        "3" : "🖊",
        "4" : "🧫",
        "5" : "🛡️",
        "6" : "🗿",
        "7" : "🧽",
        "8" : "🚽",
        "9" : "🚪",
        "0" : "🪓"
    },
    unknownCharacter : "😑",
    execute(msg, args) {
        var emojiName = "Her er dit emojinavn: ";

        for(char of msg.author.username.toLowerCase())
        {
            if(this.alphabet.hasOwnProperty(char)) 
            {
                emojiName += this.alphabet[char];
            } else 
            {
                emojiName += this.unknownCharacter;
            }
        }
        
        msg.reply(emojiName);
    }
};