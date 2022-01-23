const axios = require('axios');

module.exports.fetchBotGuilds = () => {
    const TOKEN = process.env.BOT_TOKEN;
    return axios.get('https://discord.com/api/v9/users/@me/guilds', {
        headers: {
            Authorization: `Bot ${TOKEN}`,
        },
    });
}

module.exports.fetchUserGuilds = (accessToken) => axios.get('https://discord.com/api/v9/users/@me/guilds', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
