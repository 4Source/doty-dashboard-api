const { getGuildConfig, updateGuildPrefix } = require("../services/guilds/guilds.service");

const router = require("express").Router();

router.get('/config/:guildId', async (req, res) => {
    const config = await getGuildConfig(req.params.guildId);
    if(!config) res.status(404).send('Guild Config with this guildId was not found in Database.');
    res.status(200).send(config);
});

router.post('/:guildId/config/prefix', async (req, res) => {
    console.log(req.params.guildId, req.body);
    if(!req.body || !req.body.prefix){
        console.log('No Prefix received.')
        res.status(404).send('No Prefix received.');
    }
    else {
        const config = await updateGuildPrefix(req.params.guildId, req.body.prefix);
        if(!config) res.status(404).send('Guild Config with this guildId was not found in Database.');
        console.log(config);
        res.status(200).send(config);
    } 
});

module.exports = router;