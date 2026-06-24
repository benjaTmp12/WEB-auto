const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const result = await authService.register(nombre, email, password);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor.' });
  }
};

// Retorna el usuario actual desde el token (para validar sesión en frontend)
const me = (req, res) => {
  return res.status(200).json({ user: req.user });
};

module.exports = { register, login, me };
