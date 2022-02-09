const { Server } = require('socket.io');

class WebSocket {
    constructor( server ) {
        this.io = new Server(server, {
            serveClient: false,
        });
    }

    // The Events Added to the EventListener 
    on() {
        this.io.on('connection', (socket) => {
            console.log(`User connected. ${socket.id}`);
            // Connection Disconnected Event
            socket.on('disconnect', () => {
                console.log(`User disconnected. ${socket.id}`);
            });
            // Default Message Event
            socket.on('message', (data) => {
                console.log(`${socket.id} send: ${data}`);
            });

            // Other Events
            // Guilds Event
            socket.on('guilds', (data) => {
                console.log(`${socket.id} send: ${data}`);
            });
        
        });
    }

    /**
     * Emit an Event with the Guild ID as Name and Passes the Data. 
     * @param {{guild_id: string, key: string, value: string}} opts 
     * @param  guild_id For which Guild is Changed
     * @param key What data is changed
     * @param value Data to be changed
     * @returns {boolean} Submitted successfully
     */
    update( opts ) {
        if(!opts.guild_id) return false;
        if(!opts.key || !opts.value) return false;

        return this.io.emit(opts.guild_id, opts);
    }
   
    guildBrodcast(guild) {
        this.io.emit(`${guild.id}`, 'Hello there');
    }
}

module.exports = WebSocket;