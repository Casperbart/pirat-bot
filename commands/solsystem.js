const Discord = require('discord.js');

module.exports = {
    name: 'solsystem',
    aliases: ['planets'],
    description: "Solsystem kommando",
    requireArgs: false,
    usage: "",
    planets: [
        {
            name: "Jorden",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1197px-The_Earth_seen_from_Apollo_17.jpg",
            distanceFromEarth: "0 km",
            movieLink: "https://www.dr.dk/drtv/se/planeterne_-jorden-og-mars_133342",
            wikipediaLink: "https://da.wikipedia.org/wiki/Jorden",
            amountOfMoon: "1",
            extraFacts: ["Hvordan kom månen: https://da.wikipedia.org/wiki/Månen"]
        }
    ],
    execute(msg, args) {
        const min = 0;
        const max = this.planets.length - 1;
        const rnd = Math.floor(Math.random() * (max - min + 1)) + min;
        
        const planet = this.planets[rnd];

        const planetEmbed = new Discord.MessageEmbed()
                .setTitle(planet.name)
                .setThumbnail(planet.image)
                .addField("Længde fra Jorden", planet.distanceFromEarth, false)
                .addField("Antal måner", planet.amountOfMoon, false)
                .addField(`Film om ${planet.name}`, planet.movieLink, false)
                .addField(`Wikipedia`, planet.wikipediaLink, false)
                .setColor('#6bcdf4')
            
        if(planet.extraFacts.length > 0) {
            for (const fact of planet.extraFacts) {
                planetEmbed.addField("Ekstra fakta", fact, false);
            }
        }
        
        msg.channel.send(planetEmbed);
    }
};

function isEmpty(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
  }