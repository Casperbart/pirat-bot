module.exports = {
    name: 'hello',
    aliases: ['hej'],
    description: "Hej kommando",
    requireArgs: false,
    usage: "",
    lines: ["Hej med dig ", "Håber du har haft en god dag", "💩"],
    execute(msg, args) {
        const min = 0;
        const max = this.lines.length - 1;
        const rnd = Math.floor(Math.random() * (max - min + 1)) + min;
        const line = this.lines[rnd];
        msg.reply(`${line}`);
    }
};