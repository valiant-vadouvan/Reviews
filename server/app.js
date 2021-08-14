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