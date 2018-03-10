class Events {
    constructor(classData) {
        Object.keys(classData).forEach((key) => { this[key] = classData[key]; });
    }

    init() {
        const events = {
            ready: this.client.on('ready', () => {
                console.log(`Connected as ${this.client.user.username}`);
            }),

            disconnect: this.client.on('disconnect', (closeEvent) => {
                console.log('Disconnected:', closeEvent);
            }),

            message: this.client.on('message', (msgObj) => {
                if (!msgObj.guild) return;
                this.mods.messageHandler.onMsg(msgObj);
            }),
        };

        return events;
    }
}

module.exports = Events;
