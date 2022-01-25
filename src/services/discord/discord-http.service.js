const axios = require('axios');

module.exports.fetchBotGuilds = async () => {
    const TOKEN = process.env.BOT_TOKEN;
    return await axios.get('https://discord.com/api/v9/users/@me/guilds', {
        headers: {
            Authorization: `Bot ${TOKEN}`,
        },
    });
}

module.exports.fetchUserGuilds = async (accessToken) => await axios.get('https://discord.com/api/v9/users/@me/guilds', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
