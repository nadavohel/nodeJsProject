require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { fsFile } = require('./log');
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportSetup = require('./handlers/users/auth/googleOAuth/passport');
const authRouteGoogle = require('./handlers/users/auth/googleOAuth/oAuthGoogle');

// connect mongoose to port 27017
async function main() {
    await mongoose.connect(process.env.REMOTE_URL);
    console.log(chalk.white.bold.underline('mongodb connection established on port 27017'));
}

main().catch(err => console.log(err));

const app = express();

// allow json in request from server
app.use(express.json());

// allow access to:
app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS,PATCH',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));

// for google logging
app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24*60*60*100,
    })
);

// for google logging
app.use(passport.initialize());
app.use(passport.session());

// for google logging
app.use("/auth", authRouteGoogle);

// logs files
fsFile(app);

// console.log url connect when success
console.log(chalk.black.bgCyan.bold.underline(process.env.REMOTE_URL));

// listen to port
app.listen(process.env.PORT);

// Set public folder static folder
app.use(express.static("public"));
console.log(chalk.blue('Hello, please give me 100 :)')); 

// user auth
require('./handlers/users/auth/login')(app);
require('./handlers/users/auth/signup')(app);
// all users request
require('./handlers/users/routes/allUsers')(app);
require('./handlers/users/routes/userById')(app);
require('./handlers/users/routes/editUser')(app);
require('./handlers/users/routes/changeBusiness')(app);
require('./handlers/users/routes/deleteUser')(app);
// all cards request
require('./handlers/cards/routes/allCards')(app);
require('./handlers/cards/routes/myCards')(app);
require('./handlers/cards/routes/oneCard')(app);
require('./handlers/cards/routes/newCard')(app);
require('./handlers/cards/routes/editToCard')(app);
require('./handlers/cards/routes/likeCard')(app);
require('./handlers/cards/routes/deleteCard')(app);
require('./handlers/cards/routes/changeBizNum')(app);
// initial data
require('./initialData/initial-data.service');

// send 404 page when page not found
app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/public//404Page.html`); 
});