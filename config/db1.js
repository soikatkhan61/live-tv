const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: process.env.DB_NAME,
  waitForConnections: true,
  multipleStatements:true
});

module.exports = pool.promise();