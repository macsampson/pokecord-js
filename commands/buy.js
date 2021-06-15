const { sets, rarityColors } = require('../utils/dictionaries.js');

module.exports = {
    name: "buy",
    description:
        "Allows user to purchase cards",
    usage: "!buy <set>",
    category: "action",
    execute(message, args, currency) {
        // console.log(currency)
        if (!(args[0] in sets)) {
            message.channel.send(`No such set "${args[0]}", please refer to !help to see available sets!`)
            // throw `No such set ${args[0]}`
            return
        }

        const target = message.mentions.users.first() || message.author;
        if (sets[args[0]][2] <= currency.getBalance(target.id)) { // this shouldnt be checking the dictionary - should call function to get the pack price
            return message.channel.send(`You have enough 💰 for that pack! You can buy it as soon as I finish this command :)`);
        } else {
            return message.channel.send(`Not enough 💰 for that pack!`);
        }

    }
}