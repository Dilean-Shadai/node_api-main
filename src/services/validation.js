//
const bcrypt = require('bcryptjs');
const conexion = require('../config/db');

const validarContrasenaCorrecta = async (contrasenaEnviada, contrasenaDB) => {
    const validaContrasena = await bcrypt.compare(contrasenaEnviada, contrasenaDB);
    if (!validaContrasena) {
      throw new Error('Contraseña incorrecta');
    }else{
      return true;
    }
};

module.exports={ validarContrasenaCorrecta };