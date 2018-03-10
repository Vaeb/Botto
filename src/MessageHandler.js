class MessageHandler {
    constructor(classData) {
        Object.keys(classData).forEach((key) => { this[key] = classData[key]; });
    }

    checkKeywords(msgObj) {
        const { content, member, channel } = msgObj;

        const matches = this.mods.util.globalRegex(content, /!{(.+?)}/gm);

        for (let i = 0; i < matches.length; i++) {
            const match = matches[i][0];

            this.mods.util.sendEmbed(channel, { title: 'Found match', desc: match });
        }
    }

    onMsg(msgObj) {
        this.checkKeywords(msgObj);
    }
}

module.exports = MessageHandler;
