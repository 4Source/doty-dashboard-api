const router = require("express").Router();
const passport = require("passport");

// Login
router.get('/', passport.authenticate('discord'));

// Redirect
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/failure',
    successRedirect: '/dashboard'
}));

// Status
router.get('/status', (req, res) => {
    res.json({
        msg: 'status',
        code: '200'
    })
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