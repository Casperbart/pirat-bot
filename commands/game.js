module.exports = {
    name: 'game',
    aliases: ['spil'],
    description: "Game kommando",
    requireArgs: false,
    usage: "",
    games: ['http://onemanmobile.github.io/NeptunesFork/', 'https://scratch.mit.edu/projects/365096591/', 'https://editor.p5js.org/dybber/present/VO0hyedes', 'https://scratch.mit.edu/projects/349225004/'],
    execute(msg, args) {
        const min = 0;
        const max = this.games.length - 1;
        const rnd = Math.floor(Math.random() * (max - min + 1)) + min;
        
        const game = this.games[rnd];

        msg.channel.send(`Hej ${msg.author}! Jeg har fundet et piratspil til dig:\n ${game}`);
    }
};