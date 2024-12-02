//Revisar que falta
const db = require('../config/db');

const agregarUsuario = async (usuario, email, pass, rol, fecha_creacion) => {
    const consulta = await db.query('INSERT INTO usuarios (usuario, email, pass, rol, fecha_creacion) VALUES (?, ?, ?, ?, ?);', [nombre, email, password, rol, fecha_creacion]);
    if (consulta.affectedRows === 0) {
        throw new Error('No hay respuesta de la base de datos');
        return false;
    }
    return true;
};

module.exports = { obtenerUsuarioPorId, agregarUsuario, obtenerUsuarioPorNombre, obtenerListaUsuarios };

