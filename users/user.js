const express = require("express");
const passport = require('passport');
const User = require("./user.schema");


const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, username, password} = req.body;
    const newUser = new User({name, username, password})
    try {
        const savedUser = await newUser.save();
        res.status(200).send(savedUser);
    } catch (e) {
        res.status(500).send({error: e});
    }
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send('Successfully logged in');
})

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) res.status(500).send({error: err});
        res.status(200).send('Successfully logged out');
    });

})

module.exports = router;