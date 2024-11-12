//
const jwt = require('jsonwebtoken');
const {validarUsuario} = require('../models/user');
const {validarContrasenaCorrecta} = require('../services/validation');
const cadena = "1234password";

const auth = async (req, res) => { 
  const {usuario, pass} = req.body;
  try {
    const user = await validarUsuario(usuario, pass);
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }
    const datosUsuario = {
      id: user.id,
      nombre: user.nombre,
      rol: user.rol
    }
    console.log(datosUsuario);
    res.status(200).json({message: 'Inicio de sesión exitoso'}); // el token por el momento omitiremos
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(400).json({ error: err.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 0
    });

    res.status(200).json({ message: 'Sesión cerrada correctamente' });
  } catch (err) {
    console.error('Error al cerrar sesión:', err);
    res.status(500).json({ error: 'Error al cerrar sesión' });
  }
};

module.exports = { auth, logout };