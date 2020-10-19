const http = require('http');
const { env, mongo, port, ip, apiRoot } = require('./config');
const mongoose = require('./services/mongoose');
const express = require("./services/express");
const {model} = require('./api/user/model');
const api = require('./api');

// >> Here is where the app
// is initializated and the
// server start running
//
// A) Uncomment this lines:
const app = express(apiRoot, api);
const server = http.createServer(app);


// >> Here will be the connection
// to mongodb.

var bodyParser = require('body-parser');
const UserController = require('./api/user/controller');
var jsonParser = bodyParser.json()
app.post('/user', jsonParser, function (req, res) {
  if (!req.body)
      return res.sendStatus(400)
  console.log(req.body);

  var user = req.body;
  res.json(user)
})


const endpoints = {};
endpoints.save = async (req, res) => {
  const user = req.body;
  console.log('Save?');
  //model.create(user).then(r => console.log(r)).catch(console.log);
  console.log(user);
  const created= model(user);
  //const created = await model.create(user);
  console.log(created);
  res.json({created});
}

app.post('/users', jsonParser, endpoints.save);

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

module.exports = app;