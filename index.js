require('dotenv').config();
const pokemon = require('pokemontcgsdk');
const Discord = require('discord.js');
const fs = require('fs');



const prefix = '!';

pokemon.configure({ apiKey: process.env.POKEMON_TCG_KEY });

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('Pokecord is now online!');

})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command == 'open') {

        client.commands.get('open').execute(message, args).catch(console.error.bind(console));

    }
})

client.login(process.env.DISCORD_CLIENT_ID)
