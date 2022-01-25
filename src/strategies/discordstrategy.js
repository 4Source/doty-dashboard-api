const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../database/models/DiscordUser');

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await DiscordUser.findOne({
            where: {
                user_id: id
            }
        })
        return user ? done(null, user.dataValues) : done(null, null);     
    } catch (err) {
        done(err, null);
    }
});

passport.use(new DiscordStrategy({
    clientID: process.env.BOT_CLIENT_ID,
    clientSecret: process.env.BOT_CLIENT_SECRET,
    callbackURL: process.env.BOT_CLIENT_REDIRECT,
    scope: ['identify', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
    console.log('passport Discord Strategy', profile, accessToken, refreshToken)
    try {
        // Find User or Create One if Not Matching Id found
        var [ user , created ] = await DiscordUser.findOrCreate({
            where: {
                user_id: profile.id
            },
            defaults: {
                user_id: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken,
            }
        });
        
        // Update AccessToken/RefreshToken if Users isn't new
        if(!created) {
            console.log("Updated AccessToken/RefreshToken");
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            await user.save();
        }
        // Pass the User in
        if(user) done(null, user.dataValues);
    } catch (error) {
        console.log(error);
        done(error, null);
    }

}));