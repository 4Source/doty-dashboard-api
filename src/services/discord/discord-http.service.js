const axios = require('axios');

const DISCORD_BASE_URL = 'https://discord.com/api/v9';

module.exports.fetchBotGuilds = async () => {
    const TOKEN = process.env.BOT_TOKEN;
    const res = await axios.get(`${DISCORD_BASE_URL}/users/@me/guilds`, {
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
    // Other Status Errors
    if(res.status != 200) {
        const error = { 
            status: res.status, 
            message: res.statusText,
            headers: res.headers,
        }
        return [ null, error ];
    }

    return [ res.data, null ];
}

module.exports.fetchUserGuilds = async (accessToken) => {
    const res = await axios.get(`${DISCORD_BASE_URL}/users/@me/guilds`, {
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
    // Other Status Errors
    if(res.status != 200) {
        const error = { 
            status: res.status, 
            message: res.statusText,
            headers: res.headers,
        }
        return [ null, error ];
    }

    return [ res.data, null ];
}

module.exports.fetchGuildChannels = async ( guildId ) => {
    const TOKEN = process.env.BOT_TOKEN;
    const res = await axios.get(`${DISCORD_BASE_URL}/guilds/${ guildId }/channels`, {
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
    // Other Status Errors
    if(res.status != 200) {
        const error = { 
            status: res.status, 
            message: res.statusText,
            headers: res.headers,
        }
        return [ null, error ];
    }

    return [ res.data, null ];
}
