const { getGuildConfig, updateGuildPrefix, updateWelcomeChannel } = require("../services/guilds/guilds.service");

const router = require("express").Router();

router.get('/:guildId/config', async (req, res) => {
    const config = await getGuildConfig(req.params.guildId);
    if(!config) res.status(404).send('Guild Config with this guildId was not found in Database.');
    res.status(200).json(config);
});

router.post('/:guildId/config/prefix', async (req, res) => {
    if(!req.body || !req.body.prefix){
        res.status(404).send('No Prefix received.');
    }
    else {
        const config = await updateGuildPrefix(req.params.guildId, req.body.prefix);
        if(!config) res.status(404).send('Guild Config with this guildId was not found in Database.');
        res.status(200).json(config);
    } 
});

router.post('/:guildId/config/welcome', async (req, res) => {
    if(!req.body || !req.body.channelId){
        res.status(404).send('No Channel ID received.');
    }
    else {
        const config = await updateWelcomeChannel(req.params.guildId, req.body.channelId);
        if(!config) res.status(404).send('Guild Config with this guildId was not found in Database.');
        res.status(200).json(config);
    } 
});

module.exports = router;