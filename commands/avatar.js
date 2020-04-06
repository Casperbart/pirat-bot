const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: [''],
    description: "Avatar kommando",
    requireArgs: false,
    usage: "",
    images: ["Kaptajn_1.png", "Kaptajn_1-1.png", "Lukas-Piskel-1.png", "klap.png", "pirat-skelet.png", "piratflag.png", "skelet.png", "pirat.png"],
    execute(msg, args) {
        const min = 0;
        const max = this.images.length - 1;
        const rnd = Math.floor(Math.random() * (max - min + 1)) + min;
        
        const fileName = this.images[rnd];

        const exampleEmbed = new Discord.MessageEmbed()
                .setTitle(fileName)
                .setDescription(`Hej ${msg.author}! Her er din nye avatar:`)
                .setColor('#6bcdf4')
                .attachFiles([`./assets/${fileName}`])
                .setImage(`attachment://${fileName}`);

        msg.channel.send(exampleEmbed);
    }
};