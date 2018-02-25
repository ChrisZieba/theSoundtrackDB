const { Pool } = require('pg');

// Should be env variables
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'thesoundtrackdb',
  password: 'postgres',
  port: 5432,
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params).catch((err) => {
      console.log(err)
    });
  }
};