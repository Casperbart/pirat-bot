const Discord = require('discord.js');
const { TopService } = require('../topService.js')


module.exports = {
    name: 'top',
    aliases: [''],
    description: "Top command",
    requireArgs: false,
    usage: "",
    async execute(msg, args) {
        let users = await TopService.getUsers()
        if(users) {
            var top = this.getTopListForArgument(users, args);
            let title = top.title;
            let description= top.description;
            let list = top.list;

            const embed = new Discord.MessageEmbed()
                    .setTitle("TOP 3 " + title)
                    .setColor('#6bcdf4')
                    .addField("#1 🏆🥇", list[0] != null ? `${list[0].username} - Score: ${list[0].score}` : 'No user found', false)
                    .addField("#2 🥈", list[1] != null ? `${list[1].username} - Score: ${list[1].score}` : 'No user found', false)
                    .addField("#3 🥉", list[2] != null ? `${list[2].username} - Score: ${list[2].score}` : 'No user found', false)
                    .setDescription(description)
                    .setFooter('Piratbotten indsamler data fra alle kanaler');
            
            msg.channel.send(embed)
        } else {
            msg.channel.send("No users found")
        }
    },
    getTopListForArgument(users, args) {
        console.log(args);
        var top = {
            title: '',
            description: '',
            list: []
        }
        if(args && args.length > 0) {
            switch(args[0]) {
                case 'emoji':
                    top.title = 'Flest emojis sendt 🤪'
                    top.description = 'Top 3 liste over hvem som har sendt flest emojis i Coding Pirates Aalborg Discord serveren'
                    top.list = TopService.topEmoji(users)
                    break;
                case 'besked':
                    top.title = 'Flest beskeder sendt ✉️'
                    top.description = 'Top 3 liste over hvem som har sendt flest beskeder i Coding Pirates Aalborg Discord serveren'
                    top.list = TopService.topMessageCount(users)
                    break;
                case 'bot':
                    top.title = 'Flest Piratbot kommandoer sendt 🤖'
                    top.description = 'Top 3 liste over hvem som har sendt flest kommandoer til PiratBot i Coding Pirates Aalborg Discord serveren'
                    top.list = TopService.topBotCount(users)
                    break;
                default:
                    top = []
            }
        }
        return top;
    }
};