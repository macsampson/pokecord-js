const Discord = require('discord.js'),
	// pokemon = require('pokemontcgsdk'),
	{ getCards } = require('../utils/getCards.js'),
	{ sets, rarityColors, rarityEmojis } = require('../utils/dictionaries.js'),
	{ User } = require('../database/dbObjects');

module.exports = {
	name: 'open',
	desc: 'Command to open up a pack of cards',
	usage: '!open <card set>',
	async execute(message, args, currency) {
		if (!(args[0] in sets)) {
			message.channel.send(
				`No such set "${args[0]}", please refer to !help to see available sets!`
			);
			// throw `No such set ${args[0]}`
			return;
		}

		// const user = await User.findOne({ where: { user_id: message.author.id } });
		const user_balance = currency.getBalance(message.author.id);
		message.channel.send(
			`Opening ${
				sets[args[0]][1].startsWith('E') ||
				sets[args[0]][1].startsWith('A') ||
				sets[args[0]][1].startsWith('I') ||
				sets[args[0]][1].startsWith('O') ||
				sets[args[0]][1].startsWith('U')
					? 'an'
					: 'a'
			} ${sets[args[0]][1]} pack!`
		);

		const target = message.mentions.users.first() || message.author;
		const user = await User.findOne({ where: { user_id: target.id } });
		// console.log("found user")
		let chosen = await getCards(sets[args[0]][0]);
		// console.log(chosen)
		let embeds = [];

		const pulledcards = Object.values(chosen).reduce(function (acc, cur) {
			return acc.concat(cur);
		}, []);

		// console.log(pulledcards.length)

		pulledcards.forEach((card, index) => {
			const rarityEmoji = rarityEmojis[card.rarity] || '❔';
			setTimeout(function () {
				let embeddedCard = new Discord.MessageEmbed()
					.setTitle(card.name)
					.setImage(card.images.large)
					.setAuthor(
						message.author.username + "'s " + card.set.name + ' cards',
						message.author.displayAvatarURL()
					)
					.setDescription(card.flavorText == undefined ? '' : card.flavorText)
					.addFields(
						{
							name: 'Rarity',
							value: `${card.rarity ? card.rarity : 'Unknown'}  ${rarityEmoji}`,
							inline: true,
						},
						{ name: 'Artist', value: card.artist, inline: true }
					)
					.setFooter('Pulled')
					.setTimestamp()
					.setColor(rarityColors[card.rarity] || '');
				message.channel.send(embeddedCard);
				user.addItem(card);
				// embeds.push(embeddedCard)
			}, 1500 * index);
		});

		// console.log(embeds)
		// message.channel.createWebhook(`${message.author.username}'s Cards`, message.author.displayAvatarURL)
		//     .then(w => w.send({ embeds }));
	},
};

// GARBAGE
// console.log(embeds)
// message.channel.createWebhook(`${message.author.username}'s Cards`, message.author.displayAvatarURL)
//     .then(w => w.send({ embeds }));

// console.log(args);
// if (args[0] == 'base') {
//     message.channel.send(`opening a ${args[0]} pack!`);
//     let cards = new Array(11);
//     let pos = 0;
//     for (let i = 0; i < 4; i++) {
//         let number = Math.floor(Math.random() * (69 - 43 + 1)) + 43;
//         await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//             .then(result => {
//                 cards.push(result.data[0]);
//                 // setTimeout(function () { message.channel.send(result.data[0]) }, i * 1000);
//             })

//     }
//     for (let i = 0; i < 1; i++) {
//         let number = Math.floor(Math.random() * (102 - 97 + 1)) + 97;
//         await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//             .then(result => {
//                 cards.push(result.data[0]);
//                 // setTimeout(function () { message.channel.send(result.data[0]) }, i * 1000);
//             })

//     }
//     let number = Math.floor(Math.random() * (95 - 91 + 1)) + 91;
//     await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//         .then(result => {
//             cards.push(result.data[0]);
//             // setTimeout(function () { message.channel.send(result.data[0]) }, 1000);

//         })

//     for (let i = 0; i < 2; i++) {
//         let number = Math.floor(Math.random() * (42 - 23 + 1)) + 23;
//         await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//             .then(result => {
//                 cards.push(result.data[0]);
//                 // setTimeout(function () { message.channel.send(result.data[0]) }, i * 1000);

//             })

//     }
//     let ranges = [[80, 90], [96, 96]];
//     let range = Math.random();
//     if (range > 0.91) {
//         range = 1;
//     } else {
//         range = 0;
//     }
//     number = Math.floor(Math.random() * (ranges[range][1] - ranges[range][0] + 1)) + ranges[range][0];
//     await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//         .then(result => {
//             cards.push(result.data[0]);
//             // setTimeout(function () { message.channel.send(result.data[0]) }, 1000);

//         })

//     ranges = [[1, 22], [70, 79]];
//     range = Math.floor(Math.random());
//     if (range > 0.71) {
//         range = 1;
//     } else {
//         range = 0;
//     }
//     number = Math.floor(Math.random() * (ranges[range][1] - ranges[range][0] + 1)) + ranges[range][0];
//     await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//         .then(result => {
//             cards.push(result.data[0]);
//             // setTimeout(function () { message.channel.send(result.data[0]) }, 1000);

//         })

//     console.log(cards);
//     let embeds = [];

//     cards.forEach((card, i) => {
//         // setTimeout(() => {
//         // message.channel.send("pulling a card...");
//         let embeddedCard = new Discord.MessageEmbed().setTitle(card.name).setImage(card.images.large);
//         embeds.push(embeddedCard)
//         // }, i * 2000);
//     });
//     message.channel.createWebhook(`${message.author.username}'s ${args[0].toString().charAt(0).toUpperCase() + args[0].slice(1)} Set Cards`, message.author.displayAvatarURL)
//         .then(w => w.send({ embeds }));

// };

// if (args[0] == 'fossil') {
//     message.channel.send(`opening a ${args[0]} pack!`);
//     let cards = new Array(11);
//     let pos = 0;
//     // Common Pokemon
//     for (let i = 0; i < 4; i++) {
//         let number = Math.floor(Math.random() * (57 - 46 + 1)) + 46;
//         await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//             .then(result => {
//                 cards.push(result.data[0]);
//                 // setTimeout(function () { message.channel.send(result.data[0]) }, i * 1000);
//             })

//     }
//     // Energy
//     for (let i = 0; i < 2; i++) {
//         let number = Math.floor(Math.random() * (102 - 97 + 1)) + 97;
//         await pokemon.card.where({ q: `set.name:base number:${number}` })
//             .then(result => {
//                 cards.push(result.data[0]);
//                 // setTimeout(function () { message.channel.send(result.data[0]) }, i * 1000);
//             })

//     }
//     // Common trainer
//     let number = Math.floor(Math.random() * (62 - 59 + 1)) + 59;
//     await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//         .then(result => {
//             cards.push(result.data[0]);
//             // setTimeout(function () { message.channel.send(result.data[0]) }, 1000);

//         })
//     // Uncommon
//     for (let i = 0; i < 3; i++) {
//         let ranges = [[31, 45], [58, 58]];
//         let range = Math.random();
//         if (range > 0.93) {
//             range = 1;
//         } else {
//             range = 0;
//         }
//         number = Math.floor(Math.random() * (ranges[range][1] - ranges[range][0] + 1)) + ranges[range][0];
//         await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//             .then(result => {
//                 cards.push(result.data[0]);
//                 // setTimeout(function () { message.channel.send(result.data[0]) }, i * 1000);

//             })
//     }
//     // Uncommon
//     // let ranges = [[31, 45], [58, 58]];
//     // let range = Math.random();
//     // if (range > 0.93) {
//     //     range = 1;
//     // } else {
//     //     range = 0;
//     // }
//     // number = Math.floor(Math.random() * (ranges[range][1] - ranges[range][0] + 1)) + ranges[range][0];
//     // await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//     //     .then(result => {
//     //         cards.push(result.data[0]);
//     //         // setTimeout(function () { message.channel.send(result.data[0]) }, 1000);

//     //     })
//     // Rare
//     number = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
//     await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//         .then(result => {
//             cards.push(result.data[0]);
//             // setTimeout(function () { message.channel.send(result.data[0]) }, 1000);

//         })

//     console.log(cards);

//     cards.forEach((card, i) => {
//         setTimeout(() => {
//             // message.channel.send("pulling a card...");
//             message.channel.send(card);
//         }, i * 2000);
//     });

// };
// if (args[0] == 'jungle') {
//     message.channel.send(`opening a ${args[0]} pack!`);
//     let cards = new Array(11);
//     let pos = 0;
//     // Commons
//     for (let i = 0; i < 5; i++) {
//         let number = Math.floor(Math.random() * (64 - 49 + 1)) + 49;
//         await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//             .then(result => {
//                 cards.push(result.data[0]);
//                 // setTimeout(function () { message.channel.send(result.data[0]) }, i * 1000);
//             })

//     }
//     // Energy
//     for (let i = 0; i < 2; i++) {
//         let number = Math.floor(Math.random() * (102 - 97 + 1)) + 97;
//         await pokemon.card.where({ q: `set.name:base number:${number}` })
//             .then(result => {
//                 cards.push(result.data[0]);
//                 // setTimeout(function () { message.channel.send(result.data[0]) }, i * 1000);
//             })

//     }
//     // // Common trainer
//     // let number = Math.floor(Math.random() * (62 - 59 + 1)) + 59;
//     // await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//     //     .then(result => {
//     //         cards.push(result.data[0]);
//     //         // setTimeout(function () { message.channel.send(result.data[0]) }, 1000);

//     //     })
//     // Uncommon pokemon
//     for (let i = 0; i < 3; i++) {
//         let number = Math.floor(Math.random() * (48 - 33 + 1)) + 33;
//         await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//             .then(result => {
//                 cards.push(result.data[0]);
//                 // setTimeout(function () { message.channel.send(result.data[0]) }, i * 1000);

//             })
//     }
//     // Uncommon trainer
//     // let ranges = [[31, 45], [58, 58]];
//     // let range = Math.random();
//     // if (range > 0.93) {
//     //     range = 1;
//     // } else {
//     //     range = 0;
//     // }
//     // number = Math.floor(Math.random() * (ranges[range][1] - ranges[range][0] + 1)) + ranges[range][0];
//     // await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//     //     .then(result => {
//     //         cards.push(result.data[0]);
//     //         // setTimeout(function () { message.channel.send(result.data[0]) }, 1000);

//     //     })
//     // Rare
//     number = Math.floor(Math.random() * (32 - 1 + 1)) + 1;
//     await pokemon.card.where({ q: `set.name:${args[0]} number:${number}` })
//         .then(result => {
//             cards.push(result.data[0]);
//             // setTimeout(function () { message.channel.send(result.data[0]) }, 1000);

//         })

//     console.log(cards);

//     cards.forEach((card, i) => {
//         setTimeout(() => {
//             // message.channel.send("pulling a card...");
//             message.channel.send(card);
//         }, i * 2000);
//     });

// };
