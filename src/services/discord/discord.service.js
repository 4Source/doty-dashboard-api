const { fetchBotGuilds, fetchUserGuilds } = require('./discord-http.service');

module.exports.getBotGuilds = async () => {
    return await fetchBotGuilds();
}

module.exports.getUserGuilds = async (accessToken) => {
    return await fetchUserGuilds(accessToken);
}

module.exports.getMutualGuilds = async(accessToken) => {
    // Get Guilds from Discord API
    const [ userGuilds, uerror ] = await this.getUserGuilds(accessToken);
    const [ botGuilds, berror ] = await this.getBotGuilds();
    
    if(uerror) return [ null, uerror];
    if(berror) return [ null, berror];

    if(!userGuilds) {
        return [ null, { 
            status: 'empty', 
            message: 'No User Guilds resived.',
            headers: '',
        }];
    }
    if(!botGuilds) {
        return [ null, { 
            status: 'empty', 
            message: 'No Bot Guilds resived.',
            headers: '',
        }];
    }
    // Filter for User Guilds with MANAGE_GUILD Permission
    const manageGuildUserGuilds = userGuilds.filter(( guild ) => guild.permissions &= 0x20);

    // Filter for User Guilds (MANAGE_GUILD) with bot in
    const mutualGuilds = manageGuildUserGuilds.filter((guild) => botGuilds.some((botGuild) => botGuild.id === guild.id));

    return [ mutualGuilds, null ];
}
