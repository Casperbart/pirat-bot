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