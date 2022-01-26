const axios = require('axios');

module.exports.fetchBotGuilds = async () => {
    const TOKEN = process.env.BOT_TOKEN;
    const res = await axios.get('https://discord.com/api/v9/users/@me/guilds', {
        headers: {
            Authorization: `Bot ${TOKEN}`,
        },
    });
    
    // Invalid Request Limit
    if(res.status === 401 || res.status === 403 || res.status === 429) {
        const error = { 
            status: res.status, 
            message: res.statusText,
            headers: res.headers,
        }
        return [ null, error ];
    }

    return [ res.data, null ];
};

module.exports.fetchUserGuilds = async (accessToken) => {
    const res = await axios.get('https://discord.com/api/v9/users/@me/guilds', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    // Invalid Request Limit
    if(res.status === 401 || res.status === 403 || res.status === 429) {
        const error = { 
            status: res.status, 
            message: res.statusText,
            headers: res.headers,
        }
        return [ null, error ];
    }

    return [ res.data, null ];
};
