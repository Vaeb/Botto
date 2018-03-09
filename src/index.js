const Auth = require('./Auth');

const Discord = require('discord.js');

const client = new Discord.Client({
    disabledEvents: ['TYPING_START'],
    fetchAllMembers: true,
    disableEveryone: true,
});

const modules = {};

const classData = { modules, client };

modules.util = new (require('./Util'))(classData);
modules.messageHandler = new (require('./MessageHandler'))(classData);
modules.events = new (require('./Events'))(classData);

modules.events.init();

client.login(Auth.discordToken);
