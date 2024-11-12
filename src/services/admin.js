// Revisar 
const {Router} = require('express');
const { add, view } = require('../controllers/users');
const validarToken = require('../middleware/auth');

const router = Router();

router.post('/api/add', validarToken, add);

router.get('/api/list', validarToken, view);

router.post('/api/user/edit/:id', validarToken);

router.post('/api/user/delete/:id', validarToken);

module.exports = router;