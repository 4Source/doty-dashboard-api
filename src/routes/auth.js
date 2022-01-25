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
    if(!req.user) res.status(404).send('User is NOT logged in.');
    res.status(200).send(`User(${req.user.user_id}) is logged in.`);
});

// Logout
router.post('/logout', (req, res) => {
    if(req.user) {
        req.logout();
        res.redirect('/');
    }
    else {
        res.redirect('/');
    }
})


module.exports = router;