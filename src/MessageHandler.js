class MessageHandler extends require('./Util') {
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
                    outStr.push(this.modules.NodeUtil.format(result));
                    outStr.push('```');
                    this.print(channel, outStr.join('\n'));
                }
            })
            .catch((err) => {
                console.log('Eval Error:', err);
            });
    }

    checkKeywords(msgObj) {
        const { content, channel } = msgObj;

        const matches = this.globalRegex(content, /{{(.+?)}}/gm);

        for (let i = 0; i < matches.length; i++) {
            const match = matches[i][0];

            console.log(`Keyword used: ${match}`);

            this.modules.malDetails.search(match, 'anime')
                .then((animes) => {
                    if (animes && animes.length > 0) {
                        animes[0].getDetails()
                            .then((details) => {
                                console.log(`Found series: ${details.title}`);

                                let useAired = details.information.aired || 'Unknown';
                                if (useAired.includes('to')) useAired = useAired.match(/(.+?) to/)[1];

                                const fields = [
                                    { name: 'Type', value: details.information.type },
                                    { name: 'Studio', value: details.information.studios },
                                    { name: 'Episodes', value: details.information.episodes || 'Unknown' },
                                    { name: 'Aired', value: useAired },
                                    { name: 'Score', value: details.score },
                                    { name: 'Rank', value: `#${details.rank}` },
                                    { name: 'Popularity', value: `#${details.popularity}` },
                                ];

                                if (details.alternativeTitles.english) {
                                    fields.splice(0, 0, { name: 'English', value: details.alternativeTitles.english });
                                } else if (details.alternativeTitles.japanese) {
                                    fields.splice(0, 0, { name: 'Japanese', value: details.alternativeTitles.japanese });
                                }

                                let useSynopsis = details.synopsis.length <= 313 ? details.synopsis.trim() : `${details.synopsis.substr(0, 313).trim()}...`;
                                useSynopsis += `\n\n${details.href}\n${this.noChar}`;

                                this.sendEmbed(channel, { title: details.title, desc: useSynopsis, image: details.poster, fields, footer: details.href });
                            })
                            .catch(this.onError);
                    }
                })
                .catch(this.onError);
        }
    }

    onMsg(msgObj) {
        this.checkEval(msgObj);
        this.checkKeywords(msgObj);
    }
}

module.exports = MessageHandler;
