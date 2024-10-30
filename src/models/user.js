const db = require('../config/db');

const obtenerUsuarioPorId = async (id) => {
    const consulta = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (consulta.length === 0 || consulta[0].length === 0) {
        throw new Error('No hay respuesta de la base de datos');
    }
    return consulta[0][0];
};

const agregarUsuario = async (nombre, password) => {
    const consulta = await db.query('INSERT INTO usuarios (nombre, password) VALUES (?, ?);', [nombre, password]);
    if (consulta.affectedRows === 0) {
        throw new Error('No hay respuesta de la base de datos');
    }
    return consulta.insertId;
}

const obtenerUsuarioPorNombre = async (nombre) => {
    try {
        const [consulta] = await db.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
        if (!consulta || consulta.length === 0) {
            console.log("No hay duplicado de usuario.");
            return true;
        }

    return false;
    } catch (error) {
        console.error("Error en la consulta a la base de datos:", error);
        throw new Error('Error en la consulta a la base de datos');
    }
};

const obtenerListaUsuarios = async () => {
    try{
        const [lista] = await db.query('SELECT id, nombre, rol FROM usuarios');
        return lista;
    } catch (error) {
        console.error("Error en la consulta a la base de datos:", error);
        throw new Error('Error en la consulta a la base de datos');
    }
};

module.exports = {obtenerUsuarioPorId, agregarUsuario, obtenerUsuarioPorNombre, obtenerListaUsuarios};

