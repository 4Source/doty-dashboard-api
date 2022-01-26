const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const DiscordUser = require('../database/models/DiscordUser');

// Passes in User ID for Cookie
passport.serializeUser(( user, done ) => {
    // Check User not null
    if(!user) done(null, null);
    // Check User ID not null
    if(!user.user_id) done(null, null);
    // Passes the User ID to the 'req' Object
    else done(null, user.user_id); 
});

// Find with the ID from Cookie User in db
passport.deserializeUser(async ( id, done ) => {
    // Check ID not null
    if(!id) done(null, null);
    await DiscordUser.findOne({
        where: {
            user_id: id
        }
    })
    .then(( user ) => {
        // Check User not null
        if(!user) done(null, null);
        // Check User Data not null
        if(!user.dataValues) done(null, null);
        // Passes the User Data
        else done(null, user.dataValues);
    })
    .catch(( err ) => {
        console.log(err);
        done(err, null);
    });
});

// Find or Create User in db with from Discord received Data
passport.use(new DiscordStrategy({
        clientID: process.env.BOT_CLIENT_ID,
        clientSecret: process.env.BOT_CLIENT_SECRET,
        callbackURL: '/api/auth/redirect',
        scope: ['identify', 'guilds'], 
    }, 
    async (accessToken, refreshToken, profile, done) => {
        // Find User or Create One if Not Matching ID found
        await DiscordUser.findOrCreate({
            where: {
                user_id: profile.id
            },
            defaults: {
                accessToken: accessToken,
                refreshToken: refreshToken,
            }
        })
        .then(async ([ user , created ]) => {
            // Update AccessToken/RefreshToken if Users isn't new
            if(!created) {
                user.accessToken = accessToken;
                user.refreshToken = refreshToken;
                await user.save();
            }
            
             // Check User not null
            if(!user) done(null, null);
            // Check User Data not null
            if(!user.dataValues) done(null, null);
            // Passes the User Data
            else done(null, user.dataValues);
        })
        .catch(( err ) => {
            console.log(err);
            done(error, null);
        });
    }
));