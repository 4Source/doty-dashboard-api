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

router.get('/guilds/:guildId/channels/:channelType', async (req, res) => {
    const type = req.params.channelType;
    const [ channels, error ] = await getGuildChannels(req.params.guildId);
    if(error) {
        console.log(error);
        res.sendStatus(500);
    }
    if(!channels) res.sendStatus(404);
    res.status(200).json(channels.filter((channel) => channel.type == type));
});

module.exports = router;