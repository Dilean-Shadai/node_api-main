//
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { agregarUsuario, obtenerUsuarioPorNombre, obtenerListaUsuarios } = require('../models/user');

// Función para renderizar la vista de usuarios
const view = async (req, res) => {
  try {
    const usuarios = await obtenerListaUsuarios(); // Obtener la lista de usuarios
    res.render('usuarios', { usuarios }); // Pasar los usuarios a la vista usuarios.hbs
  } catch (error) {
    res.status(500).send('Error al obtener usuarios');
  }
};

// Función para obtener los usuarios a través de la API (devuelve JSON)
const obtenerUsuariosAPI = async (req, res) => {
  try {
    const usuarios = await obtenerListaUsuarios(); // Obtener la lista de usuarios
    res.status(200).json(usuarios); // Devolver la lista en formato JSON
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: 'Error al obtener la lista de usuarios.' });
  }
};

// Función para agregar un nuevo usuario
const add = async (req, res) => {
  const { nombre, email, password, rol, fecha_creacion } = req.body; // Obtener datos del cuerpo de la solicitud

  try {
    // Validar si el usuario ya existe
    const usuarioExistente = await obtenerUsuarioPorNombre(nombre);
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El nombre de usuario ya está registrado' });
    }

    // Encriptar la contraseña
    const passwordEncriptado = await bcrypt.hash(password, 10);

    // Agregar usuario a la base de datos
    const resultado = await agregarUsuario(nombre, email, passwordEncriptado, rol, fecha_creacion);

    if (resultado) {
      res.status(201).json({ mensaje: 'Usuario agregado correctamente' });
    } else {
      res.status(500).json({ error: 'Error al agregar el usuario' });
    }
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    res.status(500).json({ error: 'Error al agregar el usuario' });
  }
};

module.exports = { view, obtenerUsuariosAPI, add }; 
