# MercadoLibre Challenge

Este proyecto es una aplicación que simula la búsqueda de productos en MercadoLibre, permitiendo a los usuarios buscar productos, ver detalles de productos específicos.

La aplicación se divide en dos partes:

- **Cliente**: Construido con React, encargado de la interfaz de usuario.
- **Servidor**: Construido con Node.js y Express, que se comunica con la API de MercadoLibre y expone servicios documentados en Swagger.

## Tabla de Contenidos

1. [Tecnologías](#tecnologías)
2. [Características](#características)
3. [Instalación](#instalación)
4. [Scripts Disponibles](#scripts-disponibles)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Testing](#testing)
7. [Swagger API Documentation](#swagger-api-documentation)
8. [Extras](#extras)
9. [Autor](#autor)

## Tecnologías

- **Cliente**: React, Create React App, SCSS
- **Servidor**: Node.js, Express, Axios
- **Documentación**: Swagger
- **Testing**: Jest, React Testing Library

## Características

### Cliente
1. **Búsqueda de Productos**: Los usuarios pueden buscar productos por palabra clave y ver una lista de resultados.
2. **Detalle del Producto**: Al seleccionar un producto, el usuario es dirigido a una página con información detallada del producto.
3. **Breadcrumb**: Navegación de categorías para ayudar al usuario a entender la ubicación de un producto en la jerarquía de categorías.
4. **Loading Spinner**: Mientras los datos se cargan desde el servidor, se muestra un componente `Loading` que indica al usuario que la información está siendo procesada.
   
![image](https://github.com/user-attachments/assets/50418c3f-fba2-44eb-a640-b8ad3252d66f)

### Servidor
1. **Endpoint de Búsqueda**: Permite buscar productos basados en una palabra clave.
2. **Endpoint de Detalle de Producto**: Proporciona información detallada de un producto específico.
3. **Swagger Documentation**: Todos los endpoints están documentados usando Swagger, facilitando la comprensión y el uso de los servicios por otros desarrolladores.

Se puede revisar la documentación de los servicios en la pagina: http://localhost:3001/api-docs/

![image](https://github.com/user-attachments/assets/5487f670-846a-4f38-b589-42a3cc91c7dc)

## Instalación

Para instalar y ejecutar este proyecto, sigue estos pasos:

### Requisitos Previos
- Node.js y npm instalados en tu máquina.

### Paso a Paso
1. Clona el repositorio:
    ```bash
    git clone https://github.com/victormoncada2301/spa-mercadolibre.git
    ```

2. Instala las dependencias del cliente y del servidor:
    ```bash
    # Navegar al cliente
    cd client
    npm install

    # Navegar al servidor
    cd ../server
    npm install
    ```

3. Configura el archivo `.env` en el servidor con la URL base de la API de MercadoLibre:
    ```plaintext
    REACT_APP_API_URL=http://localhost:3001
    ```

## Scripts Disponibles

### Cliente

En el directorio `client`, puedes ejecutar:

- `npm start`: Inicia la aplicación en modo de desarrollo. Abre [http://localhost:3000](http://localhost:3000).
- `npm test`: Ejecuta las pruebas unitarias en modo interactivo.

![image](https://github.com/user-attachments/assets/3870e3ca-2908-413d-8880-8eab2e514ac5)

### Servidor

En el directorio `server`, puedes ejecutar:

- `npm start`: Inicia el servidor en [http://localhost:3001](http://localhost:3001).

## Estructura del Proyecto

```plaintext
mercadolibre-challenge/
├── client/              # Aplicación de cliente (React)
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   │   ├── Global/  # Componentes globales como Loading y SearchBox
│   │   │   └── Pages/   # Componentes de páginas como ProductDetail y SearchResults
│   ├── .env             # Variables de entorno para el cliente
│   └── package.json
├── server/              # Servidor Node.js y API
│   ├── src/
│   │   ├── controllers/ # Controladores para los endpoints
│   │   ├── routes/      # Definición de rutas del servidor
│   ├── swaggerConfig.js # Configuración de Swagger
│   ├── .env             # Variables de entorno para el servidor
│   └── package.json
└── README.md
