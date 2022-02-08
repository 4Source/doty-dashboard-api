const webSocket = require('../../websocket/websocket.module').use();

/**
 * 
 * @param {*} config 
 */
module.exports.emitGuildPrefixUpdate = (config) => {
    webSocket.update({guildId: `${config.guild_id}`, key: 'prefix', value: `${config.prefix}`});
}