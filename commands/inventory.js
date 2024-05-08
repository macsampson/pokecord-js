const { MessageEmbed } = require('discord.js');
const { User } = require('../database/dbObjects');

module.exports = {
	name: 'inventory',
	description: 'Show inventory of user',
	usage: '!inventory',
	category: 'info',
	async execute(message, args) {
		const target = message.mentions.users.first() || message.author;
		const user = await User.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();

		if (!items.length)
			return message.channel.send(
				`${target.tag} has no items in their inventory.`
			);

		// Grouping items by set
		const itemsBySet = {};
		items.forEach((item) => {
			if (!itemsBySet[item.set_name]) {
				itemsBySet[item.set_name] = [];
			}
			itemsBySet[item.set_name].push(item);
		});

		// Creating an embed
		const embed = new MessageEmbed()
			.setTitle(`${target.tag}'s Inventory 📦`)
			.setColor('#0099ff')
			.setDescription(
				'Here are the cards you have collected, organized by set:'
			);

		// Add grouped items to the embed
		Object.keys(itemsBySet).forEach((set) => {
			const setDescription = itemsBySet[set]
				.map((item) => `${item.amount}x ${item.name}`)
				.join('\n');
			embed.addField(set, setDescription, true);
		});

		// Balancing fields in the last row to make two columns
		if (embed.fields.length % 2 !== 0) {
			embed.addField('\u200B', '\u200B', true); // Add an invisible field to balance the columns
		}

		// Send the embed
		message.channel.send(embed);
	},
};
