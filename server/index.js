const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig');

const app = require('./src/app');
const PORT = process.env.PORT || 3001;

// Ruta de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación de la API disponible en http://localhost:${PORT}/api-docs`);
});
