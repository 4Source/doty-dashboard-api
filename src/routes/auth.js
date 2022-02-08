const router = require("express").Router();
const passport = require("passport");

// Auth with Discord
router.get('/', passport.authenticate('discord'));

// Redirect
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: 'http://localhost:3000',
}), (req, res) => {
    res.redirect('http://localhost:3000/servers');
});

// Status
router.get('/status', async(req, res) => {
    if(!req.user) res.status(404).json(null);
    else {
        var user = req.user;
        delete user.accessToken;
        delete user.refreshToken;
        res.status(200).json(user);
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000');
})


module.exports = router;