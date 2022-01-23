const router = require("express").Router();
const passport = require("passport");

// Login
router.get('/', passport.authenticate('discord'));

// Redirect
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/failure/access-denied',
    successRedirect: 'http://localhost:3000/dashboard/servers'
}));

// Status
router.get('/status', (req, res) => {
    res.send(req.user);
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