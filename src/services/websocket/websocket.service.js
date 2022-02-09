const webSocket = require('../../websocket/websocket.module').use();

/**
 * 
 * @param {*} config 
 */
module.exports.emitGuildPrefixUpdate = (config) => {
    webSocket.update({guild_id: `${config.guild_id}`, key: 'prefix', value: `${config.prefix}`});
}