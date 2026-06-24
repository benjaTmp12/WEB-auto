const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (nombre, email, password) => {
  // Validaciones básicas
  if (!nombre || !email || !password) {
    throw { status: 400, message: 'Nombre, email y contraseña son obligatorios.' };
  }
  if (password.length < 6) {
    throw { status: 400, message: 'La contraseña debe tener al menos 6 caracteres.' };
  }

  // Email duplicado
  const existe = await User.findOne({ where: { email } });
  if (existe) {
    throw { status: 409, message: 'El email ya está registrado.' };
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ nombre, email, password: hash });

  const token = jwt.sign(
    { id: user.id, email: user.email, nombre: user.nombre },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token, user: { id: user.id, nombre: user.nombre, email: user.email } };
};

const login = async (email, password) => {
  if (!email || !password) {
    throw { status: 400, message: 'Email y contraseña son obligatorios.' };
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw { status: 401, message: 'Credenciales inválidas.' };
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw { status: 401, message: 'Credenciales inválidas.' };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, nombre: user.nombre },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { token, user: { id: user.id, nombre: user.nombre, email: user.email } };
};

module.exports = { register, login };
