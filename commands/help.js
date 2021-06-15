const { MessageEmbed } = require("discord.js");
const { execute } = require("./open");
const { sets } = require('../utils/dictionaries.js')

module.exports = {
    name: "help",
    description:
        "Get list of all command and even get to know every command detials",
    usage: "!help <cmd>",
    category: "info",
    async execute(message, args) {
        // if (args[0]) {
        // const command = await client.commands.get(args[0]);

        // if (!command) {
        //     return message.channel.send("Unknown Command: " + args[0]);
        // }

        let setIDs = Object.entries(sets)
        // const reducer = (acc, curr) => acc + "\n"
        // console.log(setIDs)
        const setcommands = setIDs.reduce(function (acc, cur) {
            return `${acc} ${cur[1][1]} : ${cur[0]} \n`;
        }, "");
        // console.log(setcommands.length)

        let embed = new MessageEmbed()
            // .setAuthor(message.author.bot)
            .setTitle("Commands")
            // .setDescription(setcommands)
            .addFields({ name: "List of set commands:", value: "WIP" })
            // .addField("Usage", "`" + command.usage + "`" || "Not Provied")
            // .setThumbnail(client.user.displayAvatarURL())
            .setColor("GREEN");
        // .setFooter(client.user.username, client.user.displayAvatarURL());

        message.channel.send(embed);
        // }
    }
}