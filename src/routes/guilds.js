const { getGuildConfig } = require("../services/guilds/guilds.service");

const router = require("express").Router();

router.get('/config/:guildId', async (req, res) => {
    const config = await getGuildConfig(req.params.guildId);
    if(!config) res.status(404).send('Guild Config with this guildId was not found in Database.');
    res.status(200).send(config);
});

module.exports = router;