module.exports = {
    name: 'welcome',
    aliases: [],
    description: "Welcome command",
    requireArgs: false,
    usage: "",
    execute(msg, args) {
        msg.channel.send(`Ohøj ${msg.author}!`)
    }
};