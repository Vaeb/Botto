class MessageHandler {
    constructor(classData) {
        Object.keys(classData).forEach((key) => { this[key] = classData[key]; });
    }

    checkEval(msgObj) {
        const { content, member, channel } = msgObj;

        if (content.substr(0, 7) != '//eval ' || member.id != '107593015014486016') return;

        let args = content.substr(7);
        args = `(async () => {\n${args}\n})()`;

        eval(args)
            .then((result) => {
                console.log('Eval result:', result);

                if (result !== undefined) {
                    const outStr = ['**Output:**'];
                    outStr.push('```');
                    outStr.push(this.mods.NodeUtil.format(result));
                    outStr.push('```');
                    this.mods.util.print(channel, outStr.join('\n'));
                }
            })
            .catch((err) => {
                console.log('Eval Error:', err);
            });
    }

    checkKeywords(msgObj) {
        const { content, channel } = msgObj;

        const matches = this.mods.util.globalRegex(content, /{{(.+?)}}/gm);

        for (let i = 0; i < matches.length; i++) {
            const match = matches[i][0];

            this.mods.malDetails.search(match, 'anime')
                .then((animes) => {
                    if (animes && animes.length > 0) {
                        animes[0].getDetails().then((details) => {
                            let useAired = details.information.aired || 'N/A';
                            if (useAired.includes('to')) useAired = useAired.match(/(.+?) to/)[1];

                            const fields = [
                                { name: 'English', value: details.alternativeTitles.english },
                                { name: 'Type', value: details.information.type },
                                { name: 'Aired', value: useAired },
                                { name: 'Studio', value: details.information.studios },
                                { name: 'Episodes', value: details.information.episodes },
                                { name: 'Score', value: details.score },
                                { name: 'Rank', value: `#${details.rank}` },
                                { name: 'Popularity', value: `#${details.popularity}` },
                            ];

                            let useSynopsis = details.synopsis.length <= 313 ? details.synopsis.trim() : `${details.synopsis.substr(0, 313).trim()}...`;
                            useSynopsis += `\n\n${details.href}\n${this.noChar}`;

                            this.mods.util.sendEmbed(channel, { title: details.title, desc: useSynopsis, image: details.poster, fields, footer: details.href });
                        });
                    }
                })
                .catch(console.err);
        }
    }

    onMsg(msgObj) {
        this.checkEval(msgObj);
        this.checkKeywords(msgObj);
    }
}

module.exports = MessageHandler;
