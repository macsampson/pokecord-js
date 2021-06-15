
const Discord = require("discord.js");
const config = require("./../config.json");
const userSchema = require("./Schema/User.js")
// guildSchema = require("./Schema/Guild.js"),
// memberSchema = require("./Schema/Member.js"),
// logSchema = require("./Schema/Log.js");

//Create/find users Database
module.exports.fetchUser = async function (key) {

    let userDB = await userSchema.findOne({ id: key });
    if (userDB) {
        return userDB;
    } else {
        userDB = new userSchema({
            id: key,
            registeredAt: Date.now(),
            balance: 0,
        })
        await userDB.save().catch(err => console.log(err));
        return userDB;
    }
};

//Create/find Log in Database
// module.exports.createLog = async function(message, data){

//     let logDB = new logSchema({
//         commandName: data.cmd.name,
//         author: { username: message.author.username, discriminator: message.author.discriminator, id: message.author.id },
//         guild: { name: message.guild ? message.guild.name : "dm", id: message.guild ? message.guild.id : "dm", channel: message.channel ? message.channel.id : "unknown" },
//         date: Date.now()
//     });
//     await logDB.save().catch(err => console.log(err));
//     return;

// };