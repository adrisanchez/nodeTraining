const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Nimda123+',
  database: 'node-course'/*,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0*/
});

const promisePool = pool.promise();

module.exports = promisePool;
