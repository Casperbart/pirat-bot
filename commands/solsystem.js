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
        },
        {
            name: "Sol",
            image: "https://lh3.googleusercontent.com/proxy/MDQpg8C3hOADuj7oYyKzkC0nlF64IiDihEDKk1ZH_3lGCOUdJA_GsiCir57yktIuCudmUTfjirLvVfnnSjoeQttMAp2i4U3ntUI1Kf81pt4DKiLjPFXMQOKESRpQlk4gOwxG",
            distanceFromEarth: "151.54 million km",
            movieLink: "",
            wikipediaLink: "http://www.rummet.dk/solsystemet/solen",
            amountOfMoon: "0",
            extraFacts: ["hvornår opstod solen: cirka 4,6 milliarder år siden"]
        },
        {
            name: "Merkur",
            image: "https://www.123fakta.com/da/wp-content/uploads/images/merkur-fakta-2.jpg",
            distanceFromEarth: "152.41 million km",
            movieLink: "https://www.dr.dk/drtv/se/planeterne_-taettest-paa-solen_133347",
            wikipediaLink: "https://da.wikipedia.org/wiki/Merkur_(planet)",
            amountOfMoon: "0",
            extraFacts: []
        },
        {
            name: "Venus",
            image: "https://images.bonnier.cloud/files/ill/production/2018/10/14014655/planeten-venus-ToZepz2itWgsbaOCv1UwDw.jpg?auto=compress&max-w=1200",
            distanceFromEarth: "45.034 million km",
            movieLink: "https://www.dr.dk/drtv/se/planeterne_-taettest-paa-solen_133347",
            wikipediaLink: "https://da.wikipedia.org/wiki/Venus_(planet)",
            amountOfMoon: "0",
            extraFacts: []
        },
        {
            name: "Mars",
            image: "https://mk0planetariumbts6c4.kinstacdn.com/wp-content/uploads/2019/06/mars5.jpg",
            distanceFromEarth: "158.33 million km",
            movieLink: "https://www.dr.dk/drtv/se/planeterne_-jorden-og-mars_133342",
            wikipediaLink: "https://en.wikipedia.org/wiki/Mars",
            amountOfMoon: "2",
            extraFacts: []
        },
        {
            name: "Jupiter",
            image: "https://www.rumfart.dk/wp-content/uploads/2016/08/jupiter2-300x300.jpg",
            distanceFromEarth: "672.17 km",
            movieLink: "https://www.dr.dk/drtv/se/planeterne_-jupiter_133346",
            wikipediaLink: "https://en.wikipedia.org/wiki/Jupiter",
            amountOfMoon: "79",
            extraFacts: []
        },
        {
            name: "Saturn",
            image: "https://images.bonnier.cloud/files/ill/production/2018/11/06170310/saturn-j5AgQnr7KO9bWf8dcB9Uqg.jpg?auto=compress&max-w=1200",
            distanceFromEarth: "1,4 milliarder kilometer",
            movieLink: "https://www.dr.dk/drtv/se/planeterne_-saturn_133341",
            wikipediaLink: "https://en.wikipedia.org/wiki/Saturn",
            amountOfMoon: "63",
            extraFacts: []
        },
        {
            name: "Uranus",
            image: "https://static.wixstatic.com/media/d0aaa1_4872611685054ef3b8b8a0a43ce720b9~mv2.png/v1/fill/w_578,h_420,al_c,lg_1,q_85/d0aaa1_4872611685054ef3b8b8a0a43ce720b9~mv2.webp",
            distanceFromEarth: " 2,58 milliarder kilometer",
            movieLink: "https://www.dr.dk/drtv/se/planeterne_-kloder-af-is_133350",
            wikipediaLink: "https://en.wikipedia.org/wiki/Uranus",
            amountOfMoon: "27",
            extraFacts: []
        },
        {
            name: "Neptun",
            image: "https://asset.dr.dk/imagescaler/?protocol=https&server=www.dr.dk&file=%2Fimages%2Fcrop%2F2019%2F02%2F20%2F1550676877_90_feature_1600x900_4.jpg&scaleAfter=crop&quality=70&w=720&h=405",
            distanceFromEarth: "4,4767 milliarder kilometer",
            movieLink: "https://www.dr.dk/drtv/se/planeterne_-kloder-af-is_133350",
            wikipediaLink: "https://en.wikipedia.org/wiki/Neptune",
            amountOfMoon: "14",
            extraFacts: []
        },
        {
            name: "Pluto",
            image: "https://cdn.pixabay.com/photo/2017/04/04/14/26/pluto-2201446_960_720.png",
            distanceFromEarth: "4,9931 milliarder kilometer",
            movieLink: "https://www.dr.dk/drtv/se/planeterne_-kloder-af-is_133350",
            wikipediaLink: "https://en.wikipedia.org/wiki/Pluto",
            amountOfMoon: "5",
            extraFacts: []
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