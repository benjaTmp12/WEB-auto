import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearAnuncio } from '../api/endpoints';

const Publicar = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    marca: '',
    modelo: '',
    anio: '',
    precio: '',
    km: '',
    descripcion: '',
    foto_url: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await crearAnuncio(form);
      navigate(`/anuncios/${res.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al publicar el anuncio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-form">
      <div className="container">
        <div className="form-card">
          <h1 className="form-title">📢 Publicar anuncio</h1>
          <p className="form-subtitle">Completa los datos de tu vehículo</p>

          {error && <div className="alert-error">{error}</div>}

          <form onSubmit={handleSubmit} id="publicar-form" className="anuncio-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pub-marca">Marca *</label>
                <input id="pub-marca" type="text" name="marca" value={form.marca}
                  onChange={handleChange} required placeholder="ej: Toyota" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="pub-modelo">Modelo *</label>
                <input id="pub-modelo" type="text" name="modelo" value={form.modelo}
                  onChange={handleChange} required placeholder="ej: Corolla" className="form-input" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pub-anio">Año *</label>
                <input id="pub-anio" type="number" name="anio" value={form.anio}
                  onChange={handleChange} required min="1900" max={new Date().getFullYear() + 1}
                  placeholder="ej: 2020" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="pub-km">Kilometraje *</label>
                <input id="pub-km" type="number" name="km" value={form.km}
                  onChange={handleChange} required min="0" placeholder="ej: 50000" className="form-input" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="pub-precio">Precio (CLP) *</label>
              <input id="pub-precio" type="number" name="precio" value={form.precio}
                onChange={handleChange} required min="0" placeholder="ej: 8500000" className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="pub-foto">URL de foto (opcional)</label>
              <input id="pub-foto" type="url" name="foto_url" value={form.foto_url}
                onChange={handleChange} placeholder="https://..." className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="pub-desc">Descripción (opcional)</label>
              <textarea id="pub-desc" name="descripcion" value={form.descripcion}
                onChange={handleChange} rows={4} placeholder="Describe el estado, equipamiento, etc."
                className="form-input form-textarea" />
            </div>

            <button type="submit" className="btn-primary" disabled={loading} id="btn-publicar">
              {loading ? 'Publicando...' : '🚀 Publicar anuncio'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Publicar;
