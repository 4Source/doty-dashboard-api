const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../database/models/DiscordUser');

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    const user = await DiscordUser.findOne({
        where: {
            user_id: id
        }
    })
    if(user) done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: process.env.BOT_CLIENT_ID,
    clientSecret: process.env.BOT_CLIENT_SECRET,
    callbackURL: process.env.BOT_CLIENT_REDIRECT,
    scope: ['identify', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {

    try {
        const [ user , created ] = await DiscordUser.findOrCreate({
            where: {
                user_id: profile.id
            }
        });
    
        if(user) done(null, user.dataValues);
    } catch (error) {
        console.log(error);
        done(error, null);
    }

}));