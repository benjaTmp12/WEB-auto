import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnuncio, editarAnuncio } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';

const Editar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await getAnuncio(id);
        const a = res.data;

        // HU-08: Si no es el dueño, bloquear en UI
        if (a.userId !== user?.id) {
          setError('No tienes permiso para editar este anuncio.');
          setLoading(false);
          return;
        }

        setForm({
          marca: a.marca,
          modelo: a.modelo,
          anio: a.anio,
          precio: a.precio,
          km: a.km,
          descripcion: a.descripcion || '',
          foto_url: a.foto_url || '',
        });
      } catch (err) {
        setError(err.response?.data?.error || 'Anuncio no encontrado.');
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [id, user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await editarAnuncio(id, form);
      navigate(`/anuncios/${id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar los cambios.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading"><div className="spinner"></div><p>Cargando...</p></div>;
  if (error) return <div className="container"><div className="alert-error">{error}</div></div>;

  return (
    <div className="page-form">
      <div className="container">
        <div className="form-card">
          <h1 className="form-title">✏️ Editar anuncio</h1>
          <p className="form-subtitle">Actualiza los datos de tu vehículo</p>

          <form onSubmit={handleSubmit} id="editar-form" className="anuncio-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-marca">Marca *</label>
                <input id="edit-marca" type="text" name="marca" value={form.marca}
                  onChange={handleChange} required className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="edit-modelo">Modelo *</label>
                <input id="edit-modelo" type="text" name="modelo" value={form.modelo}
                  onChange={handleChange} required className="form-input" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="edit-anio">Año *</label>
                <input id="edit-anio" type="number" name="anio" value={form.anio}
                  onChange={handleChange} required min="1900" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="edit-km">Kilometraje *</label>
                <input id="edit-km" type="number" name="km" value={form.km}
                  onChange={handleChange} required min="0" className="form-input" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="edit-precio">Precio (CLP) *</label>
              <input id="edit-precio" type="number" name="precio" value={form.precio}
                onChange={handleChange} required min="0" className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="edit-foto">URL de foto (opcional)</label>
              <input id="edit-foto" type="url" name="foto_url" value={form.foto_url}
                onChange={handleChange} placeholder="https://..." className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="edit-desc">Descripción (opcional)</label>
              <textarea id="edit-desc" name="descripcion" value={form.descripcion}
                onChange={handleChange} rows={4} className="form-input form-textarea" />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => navigate(`/anuncios/${id}`)}
                className="btn-secondary">Cancelar</button>
              <button type="submit" className="btn-primary" disabled={saving} id="btn-guardar">
                {saving ? 'Guardando...' : '💾 Guardar cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editar;
