const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./utils/DataBase.js');
const usersLib = require('./lib/users');

const app = express();

db.setUpCollection();

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.post('/users', function (req, res) {
  usersLib.createUser(req.body)
    .then(data => res.status(201).send({ _id: data._id }))
    .catch(err => {
      res.status(err.status || 500).send({error: err || '500 - server error'})
    })
});

app.delete('/users', function (req, res) {
  usersLib.removeUser(req.body)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({error: err || '500 - server error'})
    })
});

app.get('/users', function (req, res) {
  usersLib.getAllUsers()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({error: err || '500 - server error'})
    })
});

app.listen(3000, function () {
  console.log('Server running!');
});

module.exports = app;
