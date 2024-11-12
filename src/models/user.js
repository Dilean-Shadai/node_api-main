// agregue lo que tiene Adri
const db = require('../config/db');

//modelo agregar usuario de agenda medica
const agregarUsuario = async (nombre_usuario,contrasena,email,rol) => {
    const consulta = await db.query('INSERT INTO usuarios (nombre_usuario,contrasena,email,rol) VALUES (?,?,?,?);', [nombre_usuario,contrasena,email,rol]);
    if (consulta.affectedRows === 0) {
        throw new Error('No hay respuesta de la base de datos');
        return false;
    }
    return true;
}

const validarUsuario = async (usuario, pass) => {
    const consulta = await db.query('SELECT * FROM usuarios WHERE usuario = ? AND pass = ?', [usuario, pass]);
    if (consulta.length === 0 || consulta[0].length === 0) {
        throw new Error('No hay respuesta de la base de datos');
    }
    return consulta[0][0];
};

//modelo para registrar pacientes a la agenda medica
const registrarPaciente = async (nombre, apellido, email, telefono) => {
    const consulta = await db.query('INSERT INTO pacientes (nombre, apellido, email, telefono) VALUES (?, ?, ?, ?);', [nombre, apellido, email, telefono]);
    if (consulta.affectedRows === 0) {
        throw new Error('No se pudo registrar el paciente. Intente nuevamente más tarde');
        return false;
    }
    return true;
}

// Modelo para crear una cita en la agenda médica
const crearCita = async (id_paciente, fecha_cita, hora_cita, motivo) => {
    const consulta = await db.query(
        'INSERT INTO citas (id_paciente, fecha_cita, hora_cita, motivo) VALUES (?, ?, ?, ?);', [id_paciente, fecha_cita, hora_cita, motivo]);
    if (consulta.affectedRows === 0) {
        throw new Error('No se pudo crear la cita. Intente nuevamente más tarde');
        return false;
    }
    return true;
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

module.exports = {validarUsuario, agregarUsuario, obtenerUsuarioPorNombre, obtenerListaUsuarios};


