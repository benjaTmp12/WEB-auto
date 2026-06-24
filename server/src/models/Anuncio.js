const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Anuncio = sequelize.define('Anuncio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  marca: {
    type: DataTypes.STRING(80),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'La marca es obligatoria' },
    },
  },
  modelo: {
    type: DataTypes.STRING(80),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El modelo es obligatorio' },
    },
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: { args: [1900], msg: 'El año debe ser mayor a 1900' },
      max: { args: [new Date().getFullYear() + 1], msg: 'Año inválido' },
    },
  },
  precio: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: { args: [0], msg: 'El precio no puede ser negativo' },
    },
  },
  km: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: { args: [0], msg: 'El kilometraje no puede ser negativo' },
    },
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  foto_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      isUrl: { msg: 'La URL de la foto no es válida' },
    },
  },
  estado: {
    type: DataTypes.ENUM('activo', 'vendido'),
    defaultValue: 'activo',
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Asociaciones
User.hasMany(Anuncio, { foreignKey: 'userId', as: 'anuncios' });
Anuncio.belongsTo(User, { foreignKey: 'userId', as: 'vendedor' });

module.exports = Anuncio;
