import api from './axios';

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');

// Anuncios
export const getAnuncios = (params) => api.get('/anuncios', { params });
export const getAnuncio = (id) => api.get(`/anuncios/${id}`);
export const getMisAnuncios = () => api.get('/anuncios/mis-anuncios');
export const crearAnuncio = (data) => api.post('/anuncios', data);
export const editarAnuncio = (id, data) => api.put(`/anuncios/${id}`, data);
export const marcarVendido = (id) => api.patch(`/anuncios/${id}/vendido`);
