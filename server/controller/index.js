const express = require('express');
const app = express();
const port = 3000;

// middleware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/reviews', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});