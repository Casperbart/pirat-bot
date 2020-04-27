const Discord = require('discord.js');

module.exports = {
    name: 'invest',
    aliases: [''],
    description: "Invest kommando",
    requireArgs: false,
    usage: "",
    companies: [
        {
            company: "Jul A/S",
            createdBy: "Julemanden",
            year: "1866",
            product: "Legetøj",
            businessModel: "Brug Nisseslaver",
            color: "#ef2e2e",
            imageName: "julemand.png"
        },
        {
            company: "Banana",
            createdBy: "Steven Hops",
            year: "1976",
            product: "Cell phones",
            businessModel: "Has high prices, but high quality",
            color: "#ef2e2e",
            imageName: "banana.png"
        },
        {
            company: "Stonks",
            createdBy: "Mememan",
            year: "2019",
            product: "Memes",
            businessModel: "STONKS",
            color: "#ef2e2e",
            imageName: "stonks.png"
        },
        {
            company: "Funeral Dance",
            createdBy: "IDK",
            year: "2020",
            product: "Funeral services",
            businessModel: "https://youtu.be/YpLMnziTwCA",
            color: "#ef2e2e",
            imageName: "funeral.png"
        }
        ],
    execute(msg, args) {
        const min = 0;
        const max = this.companies.length - 1;
        const rnd = Math.floor(Math.random() * (max - min + 1)) + min;
        
        const invest = this.companies[rnd];

        const investEmbed = new Discord.MessageEmbed()
                .setTitle(invest.company)
                .addField('Stiftet', invest.year, false)
                .setColor(invest.color)
                .addField('Lavet af', invest.createdBy, false)
                .addField('Product', invest.product, false)
                .addField('Business Model', invest.businessModel, false)
                .attachFiles([`./assets/invest/${invest.imageName}`])
                .setImage(`attachment://${invest.imageName}`);

        msg.channel.send(investEmbed);
    }
};