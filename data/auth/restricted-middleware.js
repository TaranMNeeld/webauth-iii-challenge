const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

function restricted(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(400).json(err);
            } else {
                req.user = {
                    username: decodedToken.username,
                    department: decodedToken.department
                };
                next();
            }
        });
    } else {
        res.status(400).json({ errorMessage: 'You must be logged in!' })
    }
}

module.exports = restricted;