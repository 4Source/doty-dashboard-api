const GuildConfig = require("../../database/models/guildConfig");


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