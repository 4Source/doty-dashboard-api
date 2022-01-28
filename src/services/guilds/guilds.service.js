const GuildConfig = require("../../database/models/guildConfig");
const { getUserGuilds } = require("../discord/discord.service");

/**
 * @param {string} guildId ID of the Guild
 */
module.exports.getGuildConfig = async ( guildId ) => {
    try {
        const config = await GuildConfig.findOne({
            where: {
                guild_id: guildId
            }
        });
        if(config) return config.dataValues;             
    } catch (err) {
        console.log(err);
    }
}

/**
 * @param {string} guildId ID of the Guild
 * @param {string} prefix Prefix which should be used before commands
 */
module.exports.updateGuildPrefix = async ( guildId, prefix ) => {
    try {
        var config = await GuildConfig.findOne({
            where: {
                guild_id: guildId
            }
        });
        if(config) {
            config.prefix = prefix;
            config = await config.save();
        }     
        if(config) return config.dataValues;        
    } catch (err) {
        console.log(err);
    }
}

/**
 * @param {string} guildId ID of the Guild
 * @param {string} welcomeChannelId Text Channel ID in Guild
 */
module.exports.updateWelcomeChannel = async ( guildId, welcomeChannelId ) => {
    try {
        var config = await GuildConfig.findOne({
            where: {
                guild_id: guildId
            }
        });
        if(config) {
            config.welcome_channel_id = welcomeChannelId;
            config = await config.save();
        }     
        if(config) return config.dataValues;        
    } catch (err) {
        console.log(err);
    }
}