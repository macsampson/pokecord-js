require('dotenv').config();
const pokemon = require('pokemontcgsdk'),
    Discord = require('discord.js'),
    fs = require('fs'),
    config = require('./config.json'),
    currency_helper = require('./utils/currency_helper');
// mongoose = require('mongoose'),
// { User, Shop } = require('./database/dbObjects');

const currency = new Discord.Collection();

currency_helper.execute(currency);

pokemon.configure({ apiKey: process.env.POKEMON_TCG_KEY });

const client = new Discord.Client();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client, currency));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client, currency));
    }
}


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.login(process.env.DISCORD_CLIENT_ID)


// Connect to the database
// mongoose.connect(config.mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB')
// }).catch((err) => {
//     console.log('Unable to connect to MongoDB Database.\nError: ' + err)
// })



