// quitamos lo de validar token
const {Router} = require('express');
const { add, view, obtenerUsuariosAPI } = require('../controllers/users');

const router = Router();

router.post('/api/add', add); // 

router.get('/api/list', view); // 

router.get('/api/usuarios', obtenerUsuariosAPI); // Esta Ruta si la usamos de momento

module.exports = router;
