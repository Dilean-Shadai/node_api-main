const conn = require('mysql2');

const conexion = conn.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Sabaku-99', // contraseña del workbeach
    database: 'db_agenda_medica', // nombre de la base de datos que usamos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });
  
module.exports = conexion.promise();