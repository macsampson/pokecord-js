const { prefix, token } = require('../config.json'),
    Discord = require('discord.js');
// currency = new Discord.Collection();

module.exports = {
    name: 'message',
    execute(message, client, currency) {
        // console.log(currency)
        currency.add(message.author.id, 1);


        if (!message.content.startsWith(prefix) || message.author.bot) {

            return;
        }


        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);

        if (command.args && !args.length) {
            message.channel.send(`You didn't provide any arguments, ${message.author}!`);
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        try {
            command.execute(message, args, currency);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to execute that command!');
        }
    },
};