module.exports = {
  name: "balance",
  description: "Shows balance of user",
  usage: "!balance",
  category: "info",
  execute(message, args, currency) {
    // console.log(currency)
    const target = message.mentions.users.first() || message.author;
    return message.channel.send(
      `${target.tag} has ${currency.getBalance(target.id)} 💰`
    );
  },
};
