import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAnuncio } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';
import { marcarVendido } from '../api/endpoints';

const Detalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuth } = useAuth();
  const [anuncio, setAnuncio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await getAnuncio(id);
        setAnuncio(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Anuncio no encontrado.');
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [id]);

  const esDueno = isAuth && user?.id === anuncio?.userId;

  const handleVendido = async () => {
    if (!window.confirm('¿Marcar como vendido?')) return;
    try {
      await marcarVendido(id);
      setAnuncio((prev) => ({ ...prev, estado: 'vendido' }));
    } catch {
      alert('Error al marcar como vendido.');
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div><p>Cargando...</p></div>;
  if (error) return <div className="container"><div className="alert-error">{error}</div></div>;

  return (
    <div className="page-detalle">
      <div className="container">
        <Link to="/" className="btn-back">← Volver al listado</Link>

        <div className="detalle-card">
          <div className="detalle-media">
            {anuncio.foto_url ? (
              <img src={anuncio.foto_url} alt={`${anuncio.marca} ${anuncio.modelo}`} className="detalle-img" />
            ) : (
              <div className="detalle-img-placeholder"><span>🚗</span></div>
            )}
          </div>

          <div className="detalle-info">
            {anuncio.estado === 'vendido' && <span className="badge-vendido-lg">VENDIDO</span>}

            <h1 className="detalle-titulo">{anuncio.marca} {anuncio.modelo}</h1>
            <p className="detalle-anio">Año {anuncio.anio}</p>

            <div className="detalle-stats">
              <div className="stat">
                <span className="stat-icon">📍</span>
                <div>
                  <p className="stat-label">Kilometraje</p>
                  <p className="stat-value">{Number(anuncio.km).toLocaleString('es-CL')} km</p>
                </div>
              </div>
              <div className="stat">
                <span className="stat-icon">📅</span>
                <div>
                  <p className="stat-label">Año</p>
                  <p className="stat-value">{anuncio.anio}</p>
                </div>
              </div>
              <div className="stat">
                <span className="stat-icon">✅</span>
                <div>
                  <p className="stat-label">Estado</p>
                  <p className="stat-value">{anuncio.estado === 'activo' ? 'Disponible' : 'Vendido'}</p>
                </div>
              </div>
            </div>

            <p className="detalle-price">${Number(anuncio.precio).toLocaleString('es-CL')}</p>

            {anuncio.descripcion && (
              <div className="detalle-desc">
                <h3>Descripción</h3>
                <p>{anuncio.descripcion}</p>
              </div>
            )}

            <div className="detalle-vendedor">
              <h3>Vendedor</h3>
              <p>{anuncio.vendedor?.nombre}</p>
              <p className="vendedor-email">{anuncio.vendedor?.email}</p>
            </div>

            {esDueno && anuncio.estado === 'activo' && (
              <div className="detalle-owner-actions">
                <Link to={`/editar/${anuncio.id}`} className="btn-editar">✏️ Editar anuncio</Link>
                <button onClick={handleVendido} className="btn-vendido">🏷️ Marcar como vendido</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
