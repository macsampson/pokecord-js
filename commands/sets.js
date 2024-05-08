const { MessageEmbed } = require('discord.js');
const { sets } = require('../utils/dictionaries.js');

module.exports = {
	name: 'sets',
	description: 'Get list of all available sets',
	usage: '!sets',
	category: 'info',
	async execute(message, args, client) {
		// Ensure 'client' is passed here if not globally available

		let setIDs = Object.entries(sets);
		let setCommands = setIDs
			.map((cur) => `*${cur[1][1]}*: ${cur[0]}`)
			.join('\n');

		// Split the setCommands into chunks that fit within Discord's field value limit
		const maxFieldLength = 1024;
		const setCommandChunks = [];

		while (setCommands.length > 0) {
			let length =
				setCommands.length > maxFieldLength
					? maxFieldLength
					: setCommands.length;
			let endIndex = setCommands.lastIndexOf('\n', length);
			if (endIndex === -1) endIndex = length;
			setCommandChunks.push(setCommands.substring(0, endIndex));
			setCommands = setCommands.substring(endIndex).trim();
		}

		// Create the embed message
		let embed = new MessageEmbed()
			.setTitle('List of All Sets')
			.setDescription('Here are all the available sets:')
			.setColor('GREEN');

		// Add each chunk as a new field in the embed
		setCommandChunks.forEach((chunk, index) => {
			embed.addField(`Sets Part ${index + 1}`, chunk);
		});

		// Send the embed message
		return message.channel.send(embed);
	},
};
