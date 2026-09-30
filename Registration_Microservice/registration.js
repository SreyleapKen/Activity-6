const express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

// Check the data received from Postman
app.use((req, res, next) => {
  console.log("Content-Type:", req.headers['content-type']);
  console.log("Body received:", req.body);
  next();
});

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');

// In Postman use the following URL
// http://localhost:5001/reg

// Example JSON:
// {
//   "firstname": "Sreyleap",
//   "email": "sreyleap@gmail.com",
//   "password": "abc123",
//   "mobile": 12345678,
//   "role": "student"
// }

function uniqueid(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  );
}

// REG API
app.post('/reg', (req, res) => {
  console.log("REG API EXECUTED");

  const pobj = new PersonModel({
    id: uniqueid(1000, 9999),
    name: req.body.firstname,
    emailid: req.body.email,
    pass: req.body.password,
    mobile: req.body.mobile,
    role: req.body.role
  });

  // INSERT / SAVE THE RECORD / DOCUMENT
  pobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERTED IN MONGODB DATABASE');
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Error in Registration Save'
      });
    });
});

// START THE EXPRESS SERVER. 5001 IS THE PORT NUMBER
app.listen(5001, () => {
  console.log('EXPRESS Server Started at Port No: 5001');
});