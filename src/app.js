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
if(mongo.uri) {
  mongoose.connect(mongo.uri).then(() => console.log('Ready'));
}


var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const endpoints = {};
endpoints.save = async (req, res) => {
  const user = req.body;
  //console.log('Save?');
  console.log(user);
  const created = await model.create(user);
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