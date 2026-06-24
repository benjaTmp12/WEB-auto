import { useState, useEffect } from 'react';
import { getAnuncios } from '../api/endpoints';
import AnuncioCard from '../components/AnuncioCard';
import FiltroBar from '../components/FiltroBar';

const Home = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtros, setFiltros] = useState({});

  const cargarAnuncios = async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      const res = await getAnuncios(params);
      setAnuncios(res.data);
    } catch (err) {
      setError('Error al cargar los anuncios. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarAnuncios(filtros);
  }, []);

  const handleFiltrar = (params) => {
    setFiltros(params);
    cargarAnuncios(params);
  };

  return (
    <div className="page-home">
      <div className="hero">
        <h1 className="hero-title">Encuentra tu próximo auto</h1>
        <p className="hero-subtitle">Miles de autos disponibles en todo Chile</p>
      </div>

      <div className="container">
        <FiltroBar onFiltrar={handleFiltrar} />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Cargando anuncios...</p>
          </div>
        )}

        {error && <div className="alert-error">{error}</div>}

        {!loading && !error && (
          <>
            <p className="results-count">{anuncios.length} anuncio{anuncios.length !== 1 ? 's' : ''} encontrado{anuncios.length !== 1 ? 's' : ''}</p>
            {anuncios.length === 0 ? (
              <div className="empty-state">
                <span>🚗</span>
                <p>No hay anuncios que coincidan con tu búsqueda.</p>
              </div>
            ) : (
              <div className="anuncios-grid">
                {anuncios.map((a) => (
                  <AnuncioCard key={a.id} anuncio={a} onUpdate={() => cargarAnuncios(filtros)} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
