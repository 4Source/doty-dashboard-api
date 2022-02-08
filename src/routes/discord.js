const { getMutualGuilds, getGuildChannels } = require('../services/discord/discord.service');
const router = require("express").Router();

router.get('/guilds', async (req, res) => {
    const [ mutuals, error ] = await getMutualGuilds(req.user.accessToken);
    if(error) {
        console.log(error);
        res.sendStatus(500);
    }
    if(!mutuals) res.sendStatus(404);
    res.status(200).json(mutuals);
});

router.post('/guilds/:guildId/channels/', async (req, res) => {
    console.log(req.params, req.body,);
    const types = req.body.type;
    const [ channels, error ] = await getGuildChannels(req.params.guildId);
    if(error) {
        console.log(error);
        res.sendStatus(500);
    }
    if(!channels) res.sendStatus(404);
    console.log(types);
    if(!(types == undefined)) {
        const filterdchannels = channels.filter((channel) => {
            console.log(channel, types.includes(channel.type))
            if(types.includes(channel.type)) return channel;
        } )
        console.log(filterdchannels);
        res.status(200).json(filterdchannels);
    }
    else{
        res.status(200).json(channels);
    }
});

module.exports = router;