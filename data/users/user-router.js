const express = require('express');

const Users = require('./user-model.js');

const restricted = require('../auth/restricted-middleware.js');

const router = express.Router();

router.get('/', restricted, (req, res) => {
    Users.getUsers()
        .then(users => {
            console.log(users);
            res.json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

module.exports = router;