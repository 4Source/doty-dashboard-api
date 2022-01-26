const { getMutualGuilds } = require('../services/discord/discord.service');
const router = require("express").Router();

router.get('/guilds', async (req, res) => {
    const [ mutuals, error ] = await getMutualGuilds(req.user.accessToken);
    if(error) {
        console.log(error);
        res.sendStatus(500);
    }
    if(!mutuals) res.sendStatus(404);
    res.status(200).send(mutuals);
});

module.exports = router;