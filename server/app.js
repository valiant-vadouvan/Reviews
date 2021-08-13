const express = require('express');
const port = 3000;

const router = require('./routes.js');

const app = express();
module.exports.app = app;

// middleware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// fwd to router
app.use('/', router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});


/*

var express = require('express');
var db = require('./db');

// Middleware
var morgan = require('morgan');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(express.json());

// Set up our routes
app.use('/classes', router);

// Serve the client files
app.use(express.static(__dirname + '/../client'));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
*/