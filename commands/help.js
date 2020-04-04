const { prefix } = require('../config.json');
module.exports = {
    name: 'help',
    aliases: ['commands', 'hjælp', '?'],
    description: "Giver en liste over alle kommandoer",
    requireArgs: false,
    usage: "[command name]",
    execute(msg, args) {
        const data = [];
        const { commands } = msg.client;

        if(!args.length) {
            data.push('Her er en liste over alle kommandoer:');
            data.push(commands.map(command => command.name).join('\n'));
            data.push(`Send besked \`${prefix} help [command name]\` for at få hjælp til en specifik kommando`);
    
            return msg.author.send(data, {split: true})
                .then(() => {
                    if(msg.channel.type === 'dm') return;
                    msg.reply('Jeg har sendt en DM til dig med alle kommandoer');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    msg.reply('Jeg kunne ikke send dig en DM. Har du slået DM\'er fra?')
                })
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if(!command) {
            return msg.reply('Kommandoen eksisterer ikke!');
        }

        data.push(`**Name:** ${command.name}`);
        if (command.aliases) 
            data.push(`**Aliaser:** ${command.aliases.join(', ')}`);
        
        if (command.description) 
            data.push(`**Beskrivelse:** ${command.description}`);
        
        if (command.usage) 
            data.push(`**Brug:** ${prefix} ${command.name} ${command.usage}`);

        msg.channel.send(data, { split: true });
    }
};