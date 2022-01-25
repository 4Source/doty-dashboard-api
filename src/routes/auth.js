const router = require("express").Router();
const passport = require("passport");

// Login
router.get('/', passport.authenticate('discord'));

// Redirect
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/failure/access-denied',
    successRedirect: 'http://localhost:3000/servers'
}));

// Status
router.get('/status', async(req, res) => {
    if(!req.user) res.status(404).send(null);
    else {
        var user = req.user;
        delete user.accessToken;
        delete user.refreshToken;
        res.status(200).send(user);
    }
});

// Logout
router.post('/logout', (req, res) => {
    console.log("logout", req.user);
    if(req.user) {
        req.logout();
        res.redirect('/');
    }
    else {
        res.redirect('/');
    }
})


module.exports = router;