const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'abc123',
  database: 'election'
});

module.exports = db;
