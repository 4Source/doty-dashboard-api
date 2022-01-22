const express = require('express');
const session = require('express-session');
const SessionStore = require('express-session-sequelize')(session.Store);
const passport = require('passport');
const discordStrategy = require('./strategies/discordstrategy');
const db = require('./database/database');
const DiscordUser = require('./database/models/DiscordUser');

const app = express();
const PORT = process.env.PORT || 3001;


(async () => {
    //Test Database Connection
    try {
        await db.authenticate();
        console.log('Connection to Database has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    
    //Sync Database Development
    await db.sync({ alter: true })
    .then((result) => {
        console.log("Syncronized Database!")
    })
    .catch((err) => {
        console.log(err);
    });
})();

// Routes
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');

app.use(session({
    secret: process.env.API_SECRET,
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    name: 'discord.oauth2',
    store: new SessionStore({
        db: db,
    }),
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

//Home Route
app.get('/', (req, res) => {
    res.sendStatus(200);
});
// Middleware Routes
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});