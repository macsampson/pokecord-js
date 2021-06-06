import pokemon from 'pokemontcgsdk';

pokemon.configure({ apiKey: process.env.POKEMON_TCG_KEY });

require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();



client.once('ready', () => {
    console.log('Pokecord is now online!');
})

client.login(process.env.DISCORD_CLIENT_ID)