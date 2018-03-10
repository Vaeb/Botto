const Auth = require('./Auth');

const { Client, RichEmbed } = require('discord.js');

const client = new Client({
    disabledEvents: ['TYPING_START'],
    fetchAllMembers: true,
    disableEveryone: true,
});

const mods = {};
const colors = { green: 0x00E676, blue: 0x00BCD4 };

const classData = { client, RichEmbed, mods, colors };

mods.util = new (require('./Util'))(classData);
mods.messageHandler = new (require('./MessageHandler'))(classData);
mods.events = new (require('./Events'))(classData);

mods.events.init();

client.login(Auth.discordToken);
