const WebSocket = require('./WebSocket');

// The Object of the WebSocket 
let webSocket;

// Inizialize the Object of the WebSocket with the passed server
const init = ( server ) => {
    webSocket = new WebSocket(server);
    return webSocket;
};

/**
 * 
 * @returns {WebSocket}
 */
// Give the Object of the WebSocket back
const use = () => {
    return webSocket;
}

// Exports Modules
module.exports = {
    init: init,
    use: use
}
