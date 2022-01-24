const { getMutualGuilds } = require('../services/discord/discord.service');
const router = require("express").Router();

router.get('/guilds', async (req, res) => {
    res.send(await getMutualGuilds(req.user.dataValues.accessToken));
});

module.exports = router;