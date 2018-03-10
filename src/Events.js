class Events extends require('./Util') {
    init() {
        console.log(this.print);

        const events = {
            ready: this.client.on('ready', () => {
                console.log(`Connected as ${this.client.user.username}`);
            }),

            disconnect: this.client.on('disconnect', (closeEvent) => {
                console.log('Disconnected:', closeEvent);
            }),

            message: this.client.on('message', (msgObj) => {
                if (!msgObj.guild) return;
                this.messageHandler.onMsg(msgObj);
            }),
        };

        return events;
    }
}

module.exports = Events;
