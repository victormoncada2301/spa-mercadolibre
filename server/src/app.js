const express = require('express');
const cors = require('cors');
const itemsRoutes = require('./routes/itemsRoutes');

const app = express();

// Habilitar CORS para todas las rutas
app.use(cors());

// Middleware para JSON
app.use(express.json());

// Rutas
app.use('/api/items', itemsRoutes);

module.exports = app;
