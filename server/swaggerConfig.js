const swaggerJsDoc = require('swagger-jsdoc');

const swaggerConfig = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de MercadoLibre",
            version: "1.0.0",
            description: "Documentación de la API para la aplicación de MercadoLibre",
            contact: {
                name: "Victor Moncada",
                email: "victor_gregorio_2301@hotmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3001",
            }
        ],
    },
    apis: ["./src/**/*.js"],
};

module.exports = swaggerJsDoc(swaggerConfig);