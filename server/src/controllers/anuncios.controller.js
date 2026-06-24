const anunciosService = require('../services/anuncios.service');

// HU-03 + HU-05: GET /anuncios?marca=&precioMin=&precioMax=
const listar = async (req, res) => {
  try {
    const { marca, precioMin, precioMax } = req.query;
    const anuncios = await anunciosService.listar({ marca, precioMin, precioMax });
    return res.status(200).json(anuncios);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message || 'Error interno.' });
  }
};

// HU-04: GET /anuncios/:id
const obtener = async (req, res) => {
  try {
    const anuncio = await anunciosService.obtenerPorId(req.params.id);
    return res.status(200).json(anuncio);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message || 'Error interno.' });
  }
};

// HU-02: POST /anuncios (auth requerida)
const crear = async (req, res) => {
  try {
    const anuncio = await anunciosService.crear(req.user.id, req.body);
    return res.status(201).json(anuncio);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message || 'Error interno.' });
  }
};

// HU-06: PUT /anuncios/:id (auth + isOwner)
const editar = async (req, res) => {
  try {
    // req.anuncio viene del isOwner middleware
    const anuncio = await anunciosService.editar(req.anuncio, req.body);
    return res.status(200).json(anuncio);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message || 'Error interno.' });
  }
};

// HU-07: PATCH /anuncios/:id/vendido (auth + isOwner)
const marcarVendido = async (req, res) => {
  try {
    const anuncio = await anunciosService.marcarVendido(req.anuncio);
    return res.status(200).json(anuncio);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message || 'Error interno.' });
  }
};

// GET /anuncios/mis-anuncios (auth requerida)
const misAnuncios = async (req, res) => {
  try {
    const anuncios = await anunciosService.misAnuncios(req.user.id);
    return res.status(200).json(anuncios);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message || 'Error interno.' });
  }
};

module.exports = { listar, obtener, crear, editar, marcarVendido, misAnuncios };
