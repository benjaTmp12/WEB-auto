import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Detalle from './pages/Detalle';
import Publicar from './pages/Publicar';
import Editar from './pages/Editar';
import MisAnuncios from './pages/MisAnuncios';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/anuncios/:id" element={<Detalle />} />

            {/* Rutas protegidas */}
            <Route path="/publicar" element={
              <ProtectedRoute><Publicar /></ProtectedRoute>
            } />
            <Route path="/editar/:id" element={
              <ProtectedRoute><Editar /></ProtectedRoute>
            } />
            <Route path="/mis-anuncios" element={
              <ProtectedRoute><MisAnuncios /></ProtectedRoute>
            } />

            {/* 404 */}
            <Route path="*" element={
              <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
                <h2>404 — Página no encontrada</h2>
                <a href="/" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                  Volver al inicio
                </a>
              </div>
            } />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
