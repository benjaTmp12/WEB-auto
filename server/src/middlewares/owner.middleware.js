const Anuncio = require('../models/Anuncio');

/**
 * Verifica que el usuario autenticado sea el dueño del anuncio.
 * Debe usarse DESPUÉS del authMiddleware.
 * Devuelve 404 si no existe, 403 si no es el dueño.
 */
const isOwner = async (req, res, next) => {
  try {
    const anuncio = await Anuncio.findByPk(req.params.id);

    if (!anuncio) {
      return res.status(404).json({ error: 'Anuncio no encontrado.' });
    }

    if (anuncio.userId !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para modificar este anuncio.' });
    }

    req.anuncio = anuncio; // lo adjuntamos para no volver a buscarlo
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Error al verificar propiedad del anuncio.' });
  }
};

module.exports = isOwner;
