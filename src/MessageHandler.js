class MessageHandler {
    constructor(classData) {
        Object.keys(classData).forEach((key) => { this[key] = classData[key]; });
    }

    checkKeywords(msgObj) {
        const { content, member, channel, guild } = msgObj;

        const matches = this.modules.util.globalRegex(content, /!{(.+?)}/gm);

        for (let i = 0; i < matches.length; i++) {
            const match = matches[i];

            console.log('Found match: ', match);
        }
    }

    onMsg(msgObj) {
        this.checkKeywords(msgObj);
    }
}

module.exports = MessageHandler;
