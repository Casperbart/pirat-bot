const Discord = require('discord.js');
const { QuizService } = require('../quizService.js');

module.exports = {
    name: 'quiz',
    aliases: [''],
    description: "Quiz kommando \n Brug quiz new til at starte en ny runde quiz. \n Indsend svar ved at sende quiz efterfulgt af svarmulighed a, b eller c",
    requireArgs: false,
    usage: "",
    async execute(msg, args) {
        await QuizService.process(msg, args);
    }
};