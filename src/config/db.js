const conn = require('mysql2');

const conexion = conn.createPool({
    host: 'localhost',
    user: 'root',
    password: 'dbtesting',
    database: 'test_api',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });
  
module.exports = conexion.promise();