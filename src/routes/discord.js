const { getMutualGuilds } = require('../services/discord/discord.service');
const router = require("express").Router();

router.get('/guilds', async (req, res) => {
    res.json(await getMutualGuilds(req.user.dataValues.accessToken));
});

module.exports = router;