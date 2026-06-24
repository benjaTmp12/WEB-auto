require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');

// Importar modelos para que Sequelize los registre y cree las asociaciones
require('./src/models/User');
require('./src/models/Anuncio');

// Importar rutas
const authRoutes = require('./src/routes/auth.routes');
const anunciosRoutes = require('./src/routes/anuncios.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globales
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rutas API
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/anuncios', anunciosRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

// Conectar DB y arrancar servidor
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL establecida.');

    // En desarrollo puedes usar sync({ alter: true }) para desarrollo rápido
    // En producción usa migraciones: npx sequelize-cli db:migrate
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('📋 Modelos sincronizados con la base de datos.');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📡 API disponible en http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    process.exit(1);
  }
};

start();
