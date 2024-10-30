const bcrypt = require('bcryptjs');
const db = require('../config/db');
const {agregarUsuario, obtenerUsuarioPorNombre, obtenerListaUsuarios} = require('../models/user');

const add = async (req, res) => {
  const { nombre, password } = req.body;
  if (!nombre || !password) {
    return res.status(400).json({ error: 'Nombre y contraseña son requeridos.' });
  }
  try {
    const usuario = await obtenerUsuarioPorNombre(nombre);
    if (usuario == false) {
      return res.status(400).json({ error: 'El usuario ya existe.' });
    }
    const encriptarPassword = await bcrypt.hash(password, 10);
    console.log("intentando agregar usuario a la db");
    await agregarUsuario(nombre, encriptarPassword);
    res.status(201).json({ mensaje: 'Usuario creado exitosamente.', id: agregarUsuario});
  } catch (err) {
    console.error('Error al agregar usuario:', err);
    res.status(500).json({ error: 'Error al agregar el usuario.' });
  }
};

const view = async (req, res) => {
  try {
    const lista = await obtenerListaUsuarios();
    res.status(200).json(lista);
} catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: 'Error al obtener la lista de usuarios.' });
}
}

module.exports = { add, view};