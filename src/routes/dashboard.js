const router = require("express").Router();

function isAuthorized(req, res, next) {
    if(req.user) {
        next();
    }
    else {
        res.redirect('/');
    }
}

router.get('/', isAuthorized, (req, res) => {
    res.sendStatus(200);
});

module.exports = router;