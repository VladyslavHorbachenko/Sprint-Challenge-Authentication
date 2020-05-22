const router = require('express').Router();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const db = require('../database/dbConfig')

router.post('/register', (req, res) => {
  // implement registration
    const credentials = req.body;
    credentials.password = bcrypt.hashSync(credentials.password, 14);

    db.addUser(credentials)
        .then(user => {
            console.log({user})
            res.status(201).send(`${credentials.username} has been created as a new user`)
        })
        .catch(err => {
            res.status(500).json({err})
        })
});

router.post('/login', (req, res) => {
  // implement login
    const credentials = req.body;

    db.findByName(credentials.username)
        .then(user => {
            if (user && bcrypt.compareSync(credentials.password, user.password)) {
                const token = generateToken(user);
                // console.log({token});

                res.cookie("token", token);
                res.status(200).send('You successfully logged in')
            } else {
                res.status(401).send('Invalid credentials')
            }
        })
        .catch(() => {
            res.status(401).json({err: 'You shall not pass'})
        })


});

function generateToken(user) {
    const payload = {
        "subject": user.id,
        "username": user.username
    }

    const options = {
        expiresIn: '1m'
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
