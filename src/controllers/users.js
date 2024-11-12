// agregue lo que tiene Adri 
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const {agregarUsuario, obtenerUsuarioPorNombre, obtenerListaUsuarios} = require('../models/user');


//controlador agegar usuario
const agregar = async (req, res) => {
  const { nombre_usuario,contrasena,email,rol} = req.body;
  try {
    console.log(nombre_usuario,contrasena,email,rol);
    const agregado = await agregarUsuario(nombre_usuario,contrasena,email,rol);
    if (agregado==true){
      res.status(201).json({ mensaje: 'Usuario creado exitosamente.'});
    }
  } catch (err) {
    console.error('Error al agregar usuario:', err);
    res.status(500).json({ error: 'Error al agregar el usuario.' });
  }
};


// controlador registrar paciente
const registrar = async (req, res) => {
  const { nombre, apellido, email, telefono } = req.body;
  try {
    console.log(nombre, apellido, email, telefono);
    const agregado = await registrarPaciente(nombre, apellido, email, telefono);
    if (agregado==true){
      res.status(201).json({ mensaje: 'Paciente registrado exitosamente.' });
    }
  } catch (err) {
    console.error('Error al registrar paciente:', err); 
    res.status(500).json({ error: 'Error al registrar al paciente.' });
  }
};

// Controlador para crear una cita
const crearCita = async (req, res) => {
  const { id_paciente, fecha_cita, hora_cita, motivo } = req.body;
  try {
    console.log(id_paciente, fecha_cita, hora_cita, motivo);
    const citaCreada = await crearCita(id_paciente, fecha_cita, hora_cita, motivo);
    if (citaCreada==true){
      res.status(201).json({ mensaje: 'Cita creada exitosamente.' });
    }
  } catch (err) {
    console.error('Error al crear cita:', err);
    res.status(500).json({ error: 'Error al crear la cita.' });
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

module.exports = { agregar, view};