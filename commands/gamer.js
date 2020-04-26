const Discord = require('discord.js');

module.exports = {
    name: 'gamer',
    aliases: [''],
    description: "Gamer kommando",
    requireArgs: false,
    userProfiles: [ 
        {
            id: "418766052714086410",
            color: "#ff0000",
            title: "Master Builder",
            description: "Casper er den bedste Master Builder nord for fjorden ⛵️",
            skill1: "Dykning",
            skill2: "Guldgravning",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
            id: "696734539082367076",
            color: "#00ff00",
            title: "Coin Master",
            description: "Lukas er god til at finde penge",
            skill1: "Grav guld op",
            skill2: "Finde skatte",
            link: "https://images.app.goo.gl/FfsveDvwwfWnN4yA9"
        },
        {
            id: "694185834789994556",
            color: "#08e8de",
            title: "Master Killer",
            description: "Halfdan er den bedste soldat i verden med sit maskingevær",
            skill1: "Skyde fjenden",
            skill2: "Vinde krige",
            link: "https://www.youtube.com/watch?v=vw61gCe2oqI"
        },
        {
            id: "356819955024396298",
            color: "#0b1c9e",
            title: "Supreme commander",
            description: "leder af 4546B ",
            skill1: "cyber cool",
            skill2: "Google stadia Master",
            link: "https://www.youtube.com/watch?v=IBkscgruZsM"
        },
        {
            id: "596993615931113493",
            color: "#33FF00",
            title: "Master Hacker",
            description: "lau hacker fjenden så de ikke kan bruge internet",
            skill1: "Hacker",
            skill2: "stjæle oplysninger fra fjenden",
            link: "https://i.pinimg.com/236x/21/96/08/2196082a69242f3c07d2fe1e9d9020da--hacker-wallpaper-iphone-wallpaper.jpg"
        },
        {
            id: "579184891841871892",
            color: "#ba0a0a",
            title: "Lonely_Mand_Der_Hører_Dak123",
            description: "Øhh… Han er vel okay nok?",
            skill1: "Kan høre dak i fem timer.",
            skill2: " Han har det længste, seje mega cool, fantastiske, bedste, underlige, Discordskill, og nu prøver jeg bare at skrive mere og mere, og jeg har intet liv, så det her har jeg massere af tid til at gøre, de næste tusind år, som bliver fantastiske, fordi at de allerede er gået, og jeg fik hjælp til at skrive det fra Shakespeare, Leonardo Da Vinci og Christoffer Columbus, som senere blev lavet om til The Magic Schoolbus, og den smuglede ti kasser øli løbet af seksten dage, og hvorfor skriver jeg stadig, nå ja, jeg har stadig ikke noget liv, og derfor skriver jeg stadig, nej vent, der er et liv, nu har jeg taget det, og nu har jeg et liv, JAH.",
            link: "https://youtu.be/UcRtFYAz2Yo"
        }

    ],
    usage: "",
    execute(msg, args) {
        console.dir(msg.author);

       var currentProfile = null;
       for(const profile of this.userProfiles)
       {
           if(profile.id === msg.author.id)
           {
               currentProfile = profile;
           }
       }

       if(currentProfile == null)
       {
           msg.reply('Du har desværre ikke fået oprettet en profil');
           return;
       }

        
        const profileEmbed = new Discord.MessageEmbed()
                .setTitle(currentProfile.title)
                .addField('Bruger', msg.author, false)
                .setDescription(currentProfile.description)
                .setColor(currentProfile.color)
                .addField('Skill', currentProfile.skill1, true)
                .addField('Skill', currentProfile.skill2, true)
                .addField('Link', currentProfile.link, false)
                .setThumbnail(msg.author.displayAvatarURL());

        msg.channel.send(profileEmbed);
    }
};