const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/user-model.js');

const validateUserData = require('./validate-user-data.js');

const router = express.Router();

router.post('/register', validateUserData, (req, res) => {
    const userData = req.body;
    const hash = bcrypt.hashSync(userData.password, 12);
    userData.password = hash;
    Users.addUser(userData)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: 'failed to register user' });
        })
})

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    Users.getUserBy({username})
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({
                    message: `Welcome, ${user.username}!`,
                    token
                });
            } else {
                res.status(400).json({ errorMessage: 'invalid credentials' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'You shall not pass!', err });
            console.log(err)
        });
});

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        department: user.department
    };
    const secret = 'some secret';
    const options = {
        expiresIn: '8h'
    };
    return jwt.sign(payload, secret, options);
}

module.exports = router;