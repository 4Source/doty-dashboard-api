const express = require('express');
const cors = require('cors');
const session = require('express-session');
const SessionStore = require('express-session-sequelize')(session.Store);
const passport = require('passport');
const discordStrategy = require('./strategies/DiscordStrategy');
const db = require('./database/database');
const models = require('./database/models');

const app = express();
const PORT = process.env.PORT || 3001;

// Database
(async () => {
    // Test Database Connection
    try {
        await db.authenticate();
        console.log('Connection to Database has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    
    // Sync Database DEVELOPMENT ONLY
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

// Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 60000 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    name: 'discord.oauth2',
    store: new SessionStore({
        db: db,
    }),
}));

// Cors
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
// Home Route
app.get('/', (req, res) => {
    res.sendStatus(200);
});
// Middleware Routes
app.use('/api/auth', authRoute);
app.use('/dashboard', dashboardRoute);

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});