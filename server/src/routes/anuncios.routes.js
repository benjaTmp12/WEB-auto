const { Router } = require('express');
const ctrl = require('../controllers/anuncios.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const isOwner = require('../middlewares/owner.middleware');

const router = Router();

// HU-03 + HU-05: Listado público con filtros
router.get('/', ctrl.listar);

// Mis anuncios (auth) — ANTES de /:id para no conflicto
router.get('/mis-anuncios', authMiddleware, ctrl.misAnuncios);

// HU-04: Detalle público
router.get('/:id', ctrl.obtener);

// HU-02: Publicar (auth)
router.post('/', authMiddleware, ctrl.crear);

// HU-06: Editar (auth + owner)
router.put('/:id', authMiddleware, isOwner, ctrl.editar);

// HU-07: Marcar vendido (auth + owner)
router.patch('/:id/vendido', authMiddleware, isOwner, ctrl.marcarVendido);

module.exports = router;
