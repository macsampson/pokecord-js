const { User, Shop } = require('../database/dbObjects');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client, currency) {
        console.log(`${client.user.tag} is now online!`);
        const storedBalances = await User.findAll();
        storedBalances.forEach(b => currency.set(b.user_id, b));
    },
};