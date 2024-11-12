//Revisar que falta
const db = require('../config/db');

const agregarUsuario = async (nombre, email, password, rol, fecha_creación ) => {
    const consulta = await db.query('INSERT INTO usuarios (nombre, email, password, roll, fecha_creacion) VALUES (?, ?);', [nombre, email, password, rol, fecha_creación]);
    if (consulta.affectedRows === 0) {
        throw new Error('No hay respuesta de la base de datos');
        return false;
    }
    return true;
}
module.exports = {obtenerUsuarioPorId, agregarUsuario, obtenerUsuarioPorNombre, obtenerListaUsuarios};