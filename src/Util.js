class Util {
    constructor(classData) {
        Object.keys(classData).forEach((key) => { this[key] = classData[key]; });
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
