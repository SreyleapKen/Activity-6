const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');
require('dotenv').config();

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');

app.use(express.json());

const JWT_SECRETE = process.env.JWT_SECRETE;

app.post("/login", (req, res) => {

    const { username, password } = req.body;

    PersonModel.findOne({
        name: username,
        pass: password
    })
    .then(user => {

        if (user) {

            const token = jwt.sign(
                {
                    username: user.name,
                    role: user.role
                },
                JWT_SECRETE,
                {
                    expiresIn: '24h'
                }
            );

            return res.json({
                token
            });
        }

        return res.status(400).send("Invalid user");
    })
    .catch(err => {
        return res.status(500).send({
            message: err.message
        });
    });
});

app.listen(5002, () => {
    console.log('Authentication Service Server is running on PORT NO: 5002');
}); 
