// postgres version
const { Pool } = require('pg')

// pools will use environment variables
// for connection information

const pool = new Pool({
  user: 'briangoodall',
  host: 'localhost',
  database: 'catwalkreviews',
  port: 5432,
});

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
// });

module.exports = pool;