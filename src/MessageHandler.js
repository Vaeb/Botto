class MessageHandler {
    constructor(classData) {
        Object.keys(classData).forEach((key) => { this[key] = classData[key]; });
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
                            const fields = [
                                { name: 'English', value: details.alternativeTitles.english },
                                { name: 'Type', value: details.information.type },
                                { name: 'Aired', value: details.information.premiered },
                                { name: 'Studio', value: details.information.studios },
                                { name: 'Episodes', value: details.information.episodes },
                                { name: 'Score', value: details.score },
                                { name: 'Rank', value: `#${details.popularity}` },
                                { name: 'Popularity', value: `#${details.rank}` },
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
        this.checkKeywords(msgObj);
    }
}

module.exports = MessageHandler;
