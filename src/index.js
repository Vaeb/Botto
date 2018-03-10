const NodeUtil = require('util');
const MalDetails = require('mal-scrape');
const { Client, RichEmbed } = require('discord.js');
const Auth = require('./Auth');

const client = new Client({
    disabledEvents: ['TYPING_START'],
    fetchAllMembers: true,
    disableEveryone: true,
});

const modules = { NodeUtil, malDetails: new MalDetails() };
const colors = { green: 0x00E676, blue: 0x00BCD4, pink: 0xD062D8 };

const classData = { client, RichEmbed, modules, colors, noChar: '­' };

let classReadyResolve;
const classReady = new Promise((resolve) => { classReadyResolve = resolve; });

classData.messageHandler = new (require('./MessageHandler'))(classData, classReady);
classData.events = new (require('./Events'))(classData, classReady);

classReadyResolve(true);

classData.events.readyPromise.then(() => {
    classData.events.init();

    client.login(Auth.discordToken);
});
