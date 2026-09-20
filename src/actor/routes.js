import express from 'express';

import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest,
    handleUpdateActorByIdRequest,
    handleDeleteActorByIdRequest
} from './controller.js';

const actorRoutes = express.Router();


// Crear actor
actorRoutes.post('/actor', handleInsertActorRequest);

// Obtener todos los actores
actorRoutes.get('/actores', handleGetActoresRequest);

// Obtener actor por ID
actorRoutes.get('/actor/:id', handleGetActorByIdRequest);

// Obtener actores asociados a una película
actorRoutes.get('/actor/pelicula/:pelicula', handleGetActoresByPeliculaIdRequest);

// Actualizar actor
actorRoutes.put('/actor/:id', handleUpdateActorByIdRequest);

// Eliminar actor
actorRoutes.delete('/actor/:id', handleDeleteActorByIdRequest);

export default actorRoutes;