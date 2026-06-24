const { Router } = require('express');
const { register, login, me } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

// GEN-04: Registro
router.post('/register', register);

// GEN-05: Login
router.post('/login', login);

// Verificar token / perfil actual
router.get('/me', authMiddleware, me);

module.exports = router;
