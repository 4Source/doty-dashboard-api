const GuildConfig = require("../../database/models/guildConfig");
const { getUserGuilds } = require("../discord/discord.service");


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