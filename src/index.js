const MalSearch = require('chinmei');
const MalDetails = require('mal-scrape');
const { Client, RichEmbed } = require('discord.js');
const Auth = require('./Auth');

const client = new Client({
    disabledEvents: ['TYPING_START'],
    fetchAllMembers: true,
    disableEveryone: true,
});

const mods = { malSearch: new MalSearch(Auth.malAcc.user, Auth.malAcc.pass), malDetails: new MalDetails() };
const colors = { green: 0x00E676, blue: 0x00BCD4 };

const classData = { client, RichEmbed, mods, colors, noChar: '­' };

mods.util = new (require('./Util'))(classData);
mods.messageHandler = new (require('./MessageHandler'))(classData);
mods.events = new (require('./Events'))(classData);

mods.events.init();

client.login(Auth.discordToken);
