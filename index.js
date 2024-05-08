require('dotenv').config();

const pokemon = require('pokemontcgsdk'),
	Discord = require('discord.js'),
	fs = require('fs'),
	config = require('./config.json'),
	currency_helper = require('./utils/currency_helper');
// (mongoose = require('mongoose')),
// 	({ User, Shop } = require('./database/dbObjects'));

const currency = new Discord.Collection();

currency_helper.execute(currency);

pokemon.configure({ apiKey: process.env.POKEMON_TCG_KEY });

const client = new Discord.Client();
client.commands = new Discord.Collection();

const eventFiles = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) =>
			event.execute(...args, client, currency)
		);
	} else {
		client.on(event.name, (...args) =>
			event.execute(...args, client, currency)
		);
	}
}

const commandFiles = fs
	.readdirSync('./commands/')
	.filter((file) => file.endsWith('.js'));
// console.log(`Loading ${commandFiles.length} commands.`);
commandFiles.forEach((file) => {
	// console.log(`Loading command file: ${file}`);
	const command = require(`./commands/${file}`);
	// console.log(`Loaded command: ${command.name}`);
	client.commands.set(command.name, command);
});
// console.log(`Registered ${client.commands.size} commands.`);

client.login(process.env.DISCORD_TOKEN);

// Connect to the database
// mongoose
// 	.connect(config.mongoURI, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => {
// 		console.log('Connected to MongoDB');
// 	})
// 	.catch((err) => {
// 		console.log('Unable to connect to MongoDB Database.\nError: ' + err);
// 	});
