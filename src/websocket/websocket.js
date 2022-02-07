const { Server } = require('socket.io');

// The Object of the WebSocket 
let webSocket;

// Inizialize the Object of the WebSocket with the passed server
const init = ( server ) => {
    webSocket = new WebSocket(server);
    return webSocket;
};

// Give the Object of the WebSocket back
const use = () => {
    return webSocket;
}

// Exports Modules
module.exports = {
    init: init,
    use: use
}

// Class Defininition 
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
            socket.on('disconnect', () => {
                console.log(`User disconnected. ${socket.id}`);
            });
            socket.on('guilds', (data) => {
                console.log(`${socket.id} send: ${data}`);
            });
        
        });
    }
}