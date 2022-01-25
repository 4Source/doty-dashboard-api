const { fetchBotGuilds, fetchUserGuilds } = require('./discord-http.service');

module.exports.getBotGuilds = async () => {
    return await fetchBotGuilds()
    .then(({ data }) => {
        return data;
    });
}

module.exports.getUserGuilds = async (accessToken) => {
    return await fetchUserGuilds(accessToken)
    .then(({ data }) => {
        return data;
    });
}

module.exports.getMutualGuilds = async(accessToken) => {
    // Get Guilds from Discord API
    const userGuilds = await this.getUserGuilds(accessToken);
    const botGuilds = await this.getBotGuilds();
    
    // Filter for User Guilds with MANAGE_GUILD Permission
    const manageGuildUserGuilds = userGuilds.filter(( guild ) => guild.permissions &= 0x20);

    // Filter for User Guilds (MANAGE_GUILD) with bot in
    const mutualGuilds = manageGuildUserGuilds.filter((guild) => botGuilds.some((botGuild) => botGuild.id === guild.id));

    return mutualGuilds;
}
