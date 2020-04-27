module.exports = {
    name: 'film',
    aliases: [''],
    description: "Har du svært ved at vælge en god film. Så kan PiratBot nu hjælpe dig med at finde en god film. Alle film kan findes på Netflix.",
    requireArgs: false,
    usage: "",
    film: ['https://www.youtube.com/watch?v=OWT4fFlEz8U', 'https://www.youtube.com/watch?v=-Pd-uuDi28U','https://www.youtube.com/watch?v=B1E7h3SeMDk', 'https://www.youtube.com/watch?v=YPfqODwT9C0', 'https://www.youtube.com/watch?v=fZ_JOBCLF-I', 'https://www.youtube.com/watch?v=MMbyPhQo75A'],
    execute(msg, args) {
        const min = 0;
        const max = this.film.length - 1;
        const rnd = Math.floor(Math.random() * (max - min + 1)) + min;
        
        const choice = this.film[rnd];

        msg.channel.send(`Hej ${msg.author}! Jeg har fundet en god film til dig. Her er filmtraileren:\n ${choice}. Du kan finde filmen på Netflix.`);
    }
};