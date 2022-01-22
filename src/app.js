const express = require('express');
const session = require('express-session');
const passport = require('passport');
const discordStrategy = require('./strategies/discordstrategy');

const app = express();
const PORT = process.env.PORT || 3001;

// Routes
const authRoute = require('./routes/auth');

app.use(session({
    secret: process.env.API_SECRET,
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use('/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});