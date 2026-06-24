import { useState } from 'react';

const FiltroBar = ({ onFiltrar }) => {
  const [marca, setMarca] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFiltrar({ marca, precioMin, precioMax });
  };

  const handleReset = () => {
    setMarca('');
    setPrecioMin('');
    setPrecioMax('');
    onFiltrar({});
  };

  return (
    <form className="filtro-bar" onSubmit={handleSubmit}>
      <div className="filtro-group">
        <label htmlFor="filtro-marca">Marca</label>
        <input
          id="filtro-marca"
          type="text"
          placeholder="ej: Toyota, Honda..."
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="filtro-input"
        />
      </div>

      <div className="filtro-group">
        <label htmlFor="filtro-precio-min">Precio mín ($)</label>
        <input
          id="filtro-precio-min"
          type="number"
          placeholder="0"
          min="0"
          value={precioMin}
          onChange={(e) => setPrecioMin(e.target.value)}
          className="filtro-input"
        />
      </div>

      <div className="filtro-group">
        <label htmlFor="filtro-precio-max">Precio máx ($)</label>
        <input
          id="filtro-precio-max"
          type="number"
          placeholder="Sin límite"
          min="0"
          value={precioMax}
          onChange={(e) => setPrecioMax(e.target.value)}
          className="filtro-input"
        />
      </div>

      <div className="filtro-actions">
        <button type="submit" className="btn-filtrar">Filtrar</button>
        <button type="button" onClick={handleReset} className="btn-reset">Limpiar</button>
      </div>
    </form>
  );
};

export default FiltroBar;
