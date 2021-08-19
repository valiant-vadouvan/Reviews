// postgres version
const { Pool } = require('pg')

// pools will use environment variables
// for connection information

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'catwalkreviews',
  port: 5432,
});

module.exports = pool;