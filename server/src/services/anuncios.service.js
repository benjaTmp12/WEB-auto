const { Op } = require('sequelize');
const Anuncio = require('../models/Anuncio');
const User = require('../models/User');

// HU-02: Publicar anuncio
const crear = async (userId, data) => {
  const { marca, modelo, anio, precio, km, descripcion, foto_url } = data;

  if (!marca || !modelo || !anio || !precio || km === undefined) {
    throw { status: 400, message: 'Marca, modelo, año, precio y kilometraje son obligatorios.' };
  }

  const anuncio = await Anuncio.create({
    marca,
    modelo,
    anio: parseInt(anio),
    precio: parseFloat(precio),
    km: parseInt(km),
    descripcion: descripcion || null,
    foto_url: foto_url || null,
    estado: 'activo',
    userId,
  });

  return anuncio;
};

// HU-03 + HU-05: Listado público con filtros
const listar = async ({ marca, precioMin, precioMax, estado }) => {
  const where = {};

  // Por defecto solo mostramos activos en el listado público
  where.estado = estado || 'activo';

  if (marca) {
    where.marca = { [Op.like]: `%${marca}%` };
  }
  if (precioMin !== undefined && precioMin !== '') {
    where.precio = { ...where.precio, [Op.gte]: parseFloat(precioMin) };
  }
  if (precioMax !== undefined && precioMax !== '') {
    where.precio = { ...where.precio, [Op.lte]: parseFloat(precioMax) };
  }

  const anuncios = await Anuncio.findAll({
    where,
    include: [{ model: User, as: 'vendedor', attributes: ['id', 'nombre', 'email'] }],
    order: [['createdAt', 'DESC']],
  });

  return anuncios;
};

// HU-04: Detalle de anuncio
const obtenerPorId = async (id) => {
  const anuncio = await Anuncio.findByPk(id, {
    include: [{ model: User, as: 'vendedor', attributes: ['id', 'nombre', 'email'] }],
  });

  if (!anuncio) {
    throw { status: 404, message: 'Anuncio no encontrado.' };
  }

  return anuncio;
};

// HU-06: Editar anuncio propio (isOwner middleware ya verificó)
const editar = async (anuncio, data) => {
  const { marca, modelo, anio, precio, km, descripcion, foto_url } = data;

  await anuncio.update({
    marca: marca ?? anuncio.marca,
    modelo: modelo ?? anuncio.modelo,
    anio: anio ? parseInt(anio) : anuncio.anio,
    precio: precio ? parseFloat(precio) : anuncio.precio,
    km: km !== undefined ? parseInt(km) : anuncio.km,
    descripcion: descripcion !== undefined ? descripcion : anuncio.descripcion,
    foto_url: foto_url !== undefined ? foto_url : anuncio.foto_url,
  });

  return anuncio;
};

// HU-07: Marcar como vendido
const marcarVendido = async (anuncio) => {
  await anuncio.update({ estado: 'vendido' });
  return anuncio;
};

// Mis anuncios (para el panel del usuario)
const misAnuncios = async (userId) => {
  const anuncios = await Anuncio.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
  });
  return anuncios;
};

module.exports = { crear, listar, obtenerPorId, editar, marcarVendido, misAnuncios };
