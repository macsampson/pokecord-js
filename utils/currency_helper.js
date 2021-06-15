const { User, Shop } = require('../database/dbObjects');
module.exports = {
    name: "currency_helper",
    description:
        "Show balance of user",
    usage: "!balance",
    category: "info",
    async execute(currency, args) {
        Reflect.defineProperty(currency, 'add', {
            /* eslint-disable-next-line func-name-matching */
            value: async function add(id, amount) {
                const user = currency.get(id);
                if (user) {
                    user.balance += Number(amount);
                    return user.save();
                }
                const newUser = await User.create({ user_id: id, balance: amount });
                currency.set(id, newUser);
                return newUser;
            },
        });

        Reflect.defineProperty(currency, 'getBalance', {
            /* eslint-disable-next-line func-name-matching */
            value: function getBalance(id) {
                const user = currency.get(id);
                return user ? user.balance : 0;
            },
        });
        return currency

    }
}

