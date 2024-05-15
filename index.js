const express = require('express');
const bodyParser = require('body-parser');
const {generateToken, verifyToken} = require("./auth-middleware");
const mongoose = require('mongoose');
const User = require("./User");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Promise
mongoose.connect('mongodb://localhost:27017/sec-mongodb', {
}).then( () => console.log('connected to mongodb!'));


app.post('/login', (req, res) => {
    const user = {
        username: req.body.username,
        company: req.body.company,
    }
    const token = generateToken(user)
    res.json({token});
});

app.get('/home', verifyToken, (req, res) => {
    res.json(req.user);
})


// User CRUD
// Created
app.post('/user', async (req, res) => {
    const {name, age, email} = req.body;
    const user = new User({name, age, email});
    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser)
    } catch (e) {
        res.status(500).send({error: e});
    }
})

app.post('/users', async (req, res) => {
    const users = await User.insertMany(req.body);
    res.status(200).status(200).send(users);
})


app.post('/query', async (req, res) => {
    const users = await User.find({ age: {$gt: 0} }, { name: 0}).sort({age: -1, createdAt: -1})
    res.send(users)
})



// Read
app.get('/user', async (req, res) => {
    try {
        const savedUsers = await User.find({});
        res.status(200).send(savedUsers)
    } catch (e) {
        res.status(500).send({error: e});
    }
})

// Read
app.get('/user/:id', async (req, res) => {
    console.log( req.params)
    const id = req.params.id;
    try {
        const savedUsers = await User.find({_id: id});
        res.status(200).send(savedUsers)
    } catch (e) {
        res.status(500).send({error: e});
    }
})





app.listen(3000, () => {
    console.log('Server running on port 3000');
});

app.use((err, req, res, next) => {
    console.error(err.stack)

    res.status(500).send('Sorry for the error, we will look into it!')
})
