import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { marcarVendido } from '../api/endpoints';

const AnuncioCard = ({ anuncio, onUpdate }) => {
  const { user, isAuth } = useAuth();
  const esDueno = isAuth && user?.id === anuncio.userId;

  const handleVendido = async () => {
    if (!window.confirm('¿Marcar este anuncio como vendido?')) return;
    try {
      await marcarVendido(anuncio.id);
      if (onUpdate) onUpdate();
    } catch {
      alert('Error al marcar como vendido.');
    }
  };

  return (
    <div className={`anuncio-card ${anuncio.estado === 'vendido' ? 'vendido' : ''}`}>
      {anuncio.foto_url ? (
        <img src={anuncio.foto_url} alt={`${anuncio.marca} ${anuncio.modelo}`} className="card-img" />
      ) : (
        <div className="card-img-placeholder">
          <span>🚗</span>
        </div>
      )}

      <div className="card-body">
        {anuncio.estado === 'vendido' && <span className="badge-vendido">VENDIDO</span>}

        <h3 className="card-title">
          {anuncio.marca} {anuncio.modelo}
        </h3>
        <p className="card-year">{anuncio.anio}</p>

        <div className="card-stats">
          <span>📍 {Number(anuncio.km).toLocaleString('es-CL')} km</span>
        </div>

        <p className="card-price">
          ${Number(anuncio.precio).toLocaleString('es-CL')}
        </p>

        <div className="card-actions">
          <Link to={`/anuncios/${anuncio.id}`} className="btn-ver">Ver detalle</Link>

          {esDueno && anuncio.estado === 'activo' && (
            <>
              <Link to={`/editar/${anuncio.id}`} className="btn-editar">Editar</Link>
              <button onClick={handleVendido} className="btn-vendido">Vendido</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnuncioCard;
