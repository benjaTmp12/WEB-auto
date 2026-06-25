import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <span className="brand-icon">🚗</span>
          <span className="brand-text">Auto<span>Market</span></span>
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">Inicio</Link>

        {isAuth ? (
          <>
            <Link to="/publicar" className="nav-link btn-publicar">+ Publicar</Link>
            <Link to="/mis-anuncios" className="nav-link">Mis Anuncios</Link>
            <span className="nav-user">Hola, {user?.nombre?.split(' ')[0]}</span>
            <button onClick={handleLogout} className="btn-logout">Salir</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Ingresar</Link>
            <Link to="/register" className="nav-link btn-register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
