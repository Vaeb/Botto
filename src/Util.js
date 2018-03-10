class Util {
    constructor(classData) {
        Object.keys(classData).forEach((key) => { this[key] = classData[key]; });
    }

    sendEmbed(channel, { title = '', desc = '', footer = '', color = this.colors.green, fields = [], image }) {
        const embed = new this.RichEmbed()
            .setTitle(title)
            .setDescription(desc)
            .setFooter(footer)
            .setThumbnail(image)
            .setColor(color);

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            embed.addField(field.name, field.value, field.inline == null ? true : field.inline);
        }

        channel.send(embed);
    }

    globalRegex(str, re) {
        const out = [];
        let match;

        while (match = re.exec(str)) {
            const newMatch = [];

            for (let i = 1; i < match.length; i++) {
                newMatch.push(match[i]);
            }

            newMatch.cap = match[0];

            out.push(newMatch);
        }

        return out;
    }
}

module.exports = Util;
