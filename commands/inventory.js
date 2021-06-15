const { User } = require('../database/dbObjects');

module.exports = {
    name: "inventory",
    description:
        "Show inventory of user",
    usage: "!inventory",
    category: "info",
    async execute(message, args) {
        const target = message.mentions.users.first() || message.author;
        const user = await User.findOne({ where: { user_id: target.id } });
        const items = await user.getItems();

        if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
        try {
            await message.channel.send(`${target.tag} currently has: \n ${items.map(i => `${i.amount} ${i.set_name} ${i.name}`).join('\n ')}`);
        } catch (error) {
            message.channel.send(`${target.tag}'s inventory is too powerful for discord - I'll fix this soon!`);
        }

    }
}