# API REST Cine Iplacex

API REST desarrollada con Express.js y MongoDB Driver para la administración de películas y actores.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- MongoDB Driver
- CORS
- dotenv

## Ejecución

Instalar dependencias:

```bash
npm install
npm start
## Endpoints
### Películas

- GET `/api/peliculas` — Obtener todas las películas.
- GET `/api/pelicula/:id` — Obtener una película por ID.
- POST `/api/pelicula` — Crear una película.
- PUT `/api/pelicula/:id` — Actualizar una película.
- DELETE `/api/pelicula/:id` — Eliminar una película.

### Actores

- GET `/api/actores` — Obtener todos los actores.
- GET `/api/actor/:id` — Obtener un actor por ID.
- GET `/api/actor/pelicula/:pelicula` — Obtener actores de una película.
- POST `/api/actor` — Crear un actor.
- PUT `/api/actor/:id` — Actualizar un actor.
- DELETE `/api/actor/:id` — Eliminar un actor.