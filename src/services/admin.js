// quitamos lo de validar token
const {Router} = require('express');
const { add, view, obtenerUsuariosAPI } = require('../controllers/users');


const router = Router();

router.post('/api/add', add); // Agregar usuario sin validación de token

router.get('/api/list', view); // Obtener lista de usuarios sin validación de token

router.get('/api/usuarios', obtenerUsuariosAPI); // para formato json

//router.post('/api/user/edit/:id'); // Editar usuario sin validación de token

//router.post('/api/user/delete/:id'); // Eliminar usuario sin validación de token

module.exports = router;
