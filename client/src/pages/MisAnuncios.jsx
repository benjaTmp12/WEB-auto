import { useState, useEffect } from 'react';
import { getMisAnuncios } from '../api/endpoints';
import AnuncioCard from '../components/AnuncioCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MisAnuncios = () => {
  const { user } = useAuth();
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargar = async () => {
    try {
      const res = await getMisAnuncios();
      setAnuncios(res.data);
    } catch (err) {
      setError('Error al cargar tus anuncios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="page-mis-anuncios">
      <div className="container">
        <div className="mis-header">
          <div>
            <h1>Mis Anuncios</h1>
            <p>Hola {user?.nombre}, aquí están tus publicaciones</p>
          </div>
          <Link to="/publicar" className="btn-primary" id="btn-nuevo-anuncio">+ Nuevo anuncio</Link>
        </div>

        {loading && <div className="loading"><div className="spinner"></div><p>Cargando...</p></div>}
        {error && <div className="alert-error">{error}</div>}

        {!loading && !error && (
          anuncios.length === 0 ? (
            <div className="empty-state">
              <span>🚗</span>
              <p>Aún no tienes anuncios publicados.</p>
              <Link to="/publicar" className="btn-primary">Publicar mi primer anuncio</Link>
            </div>
          ) : (
            <div className="anuncios-grid">
              {anuncios.map((a) => (
                <AnuncioCard key={a.id} anuncio={a} onUpdate={cargar} />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MisAnuncios;
