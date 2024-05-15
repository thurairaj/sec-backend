const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("./config/passport-config");


const userRoutes = require('./users/user');
const apiRoutes = require('./api/api');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));
// Promise
app.use(passport.initialize());
app.use(passport.session());


app.use('/users', userRoutes);
app.use('/api', apiRoutes);

mongoose.connect('mongodb://localhost:27017/sec-backend-mongodb', {
}).then( () => console.log('connected to mongodb!'));



app.listen(3000, () => {
    console.log('Server running on port 3000');
});

app.use((err, req, res, next) => {
    console.error(err.stack)

    res.status(500).send('Sorry for the error, we will look into it!')
})
