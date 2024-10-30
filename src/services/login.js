const {Router} = require('express');
const { auth, logout } = require('../controllers/auth');

const router = Router();

router.post('/api/auth', auth);

router.post('/api/logout', logout);

module.exports = router;