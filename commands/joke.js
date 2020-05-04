module.exports = {
    name: 'joke',
    aliases: ['jokes', 'vittighed', 'vittigheder'],
    description: "",
    requireArgs: false,
    usage: "",
    jokes: ["-Du har ringet til Zoologisk have \n - du taler med Bjørn", "Hvor tager duer på ferie? \n – I Duebai",
    "Hvem der? \n -Finn \n Finn hvem? \n -Finn selv ud af det",
    "Hvorfor hyler prærieulve kun om natten? \n – De kan kun se kaktusserne om dagen!.",
    "Hvad er mågernes ynglings betalings måde? \n – Mågebilepay",
    "Hvad er mågers ynglings tv program? \n – go’ mågen Danmark",
    "Hvad er sjovest en måge eller due joke? \n – det måge due selv om!",
    "Hvor kører mågen, når den skal hurtigt frem? \n – På motorvejen",
    "Hvorfor skulle skyen i skole? \n Fordi den skulle lære og regne.",
    "To blondiner var så uheldige at falde ned i et mørkt hul. \n  Den ene sagde: “Der er godt nok mørkt hernede. Synes du ikke også?”. \n Den anden svarede: “Det ved jeg da ikke, jeg kan intet se!”",
    "Hvorfor kan man aldrig sælge en zoologisk have? \n – Den er altid alt for dyr.",
    "Hvad sagde Jesus, da han satte sig ind i taxaen? \n -Sømmet helt i bund!",
    "Hvilke ænder må man gerne jage hele året rundt? \n – En sjællænder.",
    "Hvorfor er det kun fædre, der må svømme i Kattegat. \n – Fordi det er farvand.",
    "Læreren siger: “Ok allesammen hvis jeg har 5 flasker i den ene hånd og 6 flasker i den anden hånd, hvad har jeg så?”. \n - “Et alkohol problem”.",
    "Læreren spørger sin elev: så hvilken bog har hjulpet dig allermest her i livet?” \n - Eleven: det må være min fars checkhæfte."
    ],
    execute(msg, args) {
        const min = 0;
        const max = this.jokes.length - 1;
        const rnd = Math.floor(Math.random() * (max - min + 1)) + min;
        
        const joke = this.jokes[rnd];

        msg.channel.send(`${joke}`);
    }
};