const jwt = require('jsonwebtoken');
const {obtenerUsuarioPorId} = require('../models/user');
const {validarContrasenaCorrecta} = require('../services/validation');
const cadena = "123tamarindo";

const auth = async (req, res) => { 
  const { id, password } = req.body;
  try {
    const usuario = await obtenerUsuarioPorId(id);
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }
    const validarPassword = await validarContrasenaCorrecta(password, usuario.password);
    if (!validarPassword) {
     return res.status(400).json({ error: 'Contraseña incorrecta' });
    }
    const datosUsuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      rol: usuario.rol
    }
    console.log(datosUsuario);
    const token = jwt.sign(datosUsuario, cadena, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Inicio de sesión exitoso'});
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