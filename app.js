var express = require('express');
var path = require('path');
var logger = require('morgan');

const fs = require('fs');
const { Client, MessageEmbed, Collection } = require('discord.js');

//const { prefix } = require('./config.json');
const prefix = process.env.PREFIX;
token = process.env.TOKEN;

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.redirect('/');
});

const client = new Client();
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageUpdate', (oldMsg, newMsg) => {
  console.log('Editing message');
  if(oldMsg.content !== newMsg.content) {
    processMessage(newMsg);
  }
});

client.on('message', msg => {
  if(msg.author.id === '418766052714086410') { //Casper
    msg.react('😂');
    msg.react('😎');
    msg.react('💯');
    msg.react('🥇');
    msg.react('🎁');
  } else if(msg.author.id === '696734539082367076') { // Lukas
    msg.react('🤩')
  } else if(msg.author.id === '694185834789994556') { // Halfdan
    msg.react('☺️')
    msg.react('😊')
  }
  processMessage(msg);
});

function processMessage(msg) {
  console.dir(msg);

  if(!msg.content.startsWith(prefix) || msg.author.bot) {
    console.log('Message does not contain prefix or is from a bot');
    return;
  }
  
  // Fjerner !pirat fra beskeden, og laver et array med kommando og argumenter
  var args = msg.content.slice(prefix.length).split(' ');
  // Fjerner mellemrum fra vores array
  args = args.filter(el => !isEmpty(el));

  if(!args || args.length <= 0) {
    console.log('No arguments where provided');
    msg.reply('Husk at sende en kommando med til PiratBot')
    return;
  }
  
  // Først element i array er vores kommando
  // Med shift() fjerner vi kommandoen fra vores array og gemmer den i en variabel
  const commandName = args.shift().toLowerCase();
  console.log(`Args: ${args}\nCommand: ${commandName}`)

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if(!command) {
    msg.reply(`Kommando ${commandName} findes ikke`)
    return;
  }

  if(command.requireArgs && !args.length) {
    let reply = `For at bruge kommando skal du tilføje argumenter`;

		if (command.usage) {
			reply += `\nEksempel på hvordan kommando skal bruge: \`${prefix} ${command.name} ${command.usage}\``;
    }
    
    msg.reply(reply);
    return;
  }

  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('Kunne ikke udføre kommando');
  }
}

client.login(token);

function isEmpty(value) {
  return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}

module.exports = app;
