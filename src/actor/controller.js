import { client, DB_NAME } from '../common/db.js';
import { ObjectId } from 'mongodb';

const actorCollection = client.db(DB_NAME).collection('actores');
const peliculaCollection = client.db(DB_NAME).collection('peliculas');


// CREAR ACTOR
export const handleInsertActorRequest = async (req, res) => {
    const data = req.body;

    try {
        let pelicula;

        // Buscar la película por su ID o por su nombre
        if (ObjectId.isValid(data.idPelicula)) {
            pelicula = await peliculaCollection.findOne({
                _id: new ObjectId(data.idPelicula)
            });
        }

        // Si no se encuentra por ID, buscar por nombre
        if (!pelicula) {
            pelicula = await peliculaCollection.findOne({
                nombre: data.idPelicula
            });
        }

        // Validar que la película exista
        if (!pelicula) {
            return res.status(400).json({
                error: 'La película asignada no existe'
            });
        }

        // Datos que se almacenarán del actor
        const actor = {
            idPelicula: pelicula._id.toString(),
            nombre: data.nombre,
            edad: data.edad,
            estaRetirado: data.estaRetirado,
            premios: data.premios
        };

        actorCollection.insertOne(actor)
            .then((result) => {
                res.status(201).json({
                    message: 'Actor creado exitosamente',
                    result
                });
            })
            .catch((error) => {
                res.status(500).json({
                    error: 'Error al insertar actor',
                    message: error.message
                });
            });

    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            message: error.message
        });
    }
};


// OBTENER TODOS LOS ACTORES
export const handleGetActoresRequest = async (req, res) => {

    actorCollection.find({}).toArray()
        .then((actores) => {
            res.status(200).json(actores);
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Error al obtener actores',
                message: error.message
            });
        });

};


// OBTENER ACTOR POR ID
export const handleGetActorByIdRequest = async (req, res) => {

    try {
        const id = new ObjectId(req.params.id);

        actorCollection.findOne({
            _id: id
        })
            .then((actor) => {

                if (!actor) {
                    return res.status(404).json({
                        error: 'Actor no encontrado'
                    });
                }

                res.status(200).json(actor);
            })
            .catch((error) => {
                res.status(500).json({
                    error: 'Error al obtener actor',
                    message: error.message
                });
            });

    } catch (error) {
        res.status(400).json({
            error: 'Id mal formado'
        });
    }

};


// OBTENER ACTORES POR PELÍCULA
export const handleGetActoresByPeliculaIdRequest = async (req, res) => {

    const peliculaId = req.params.pelicula;

    actorCollection.find({
        idPelicula: peliculaId
    }).toArray()
        .then((actores) => {
            res.status(200).json(actores);
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Error al obtener actores de la película',
                message: error.message
            });
        });

};


// ACTUALIZAR ACTOR
export const handleUpdateActorByIdRequest = async (req, res) => {

    try {
        const id = new ObjectId(req.params.id);
        const data = req.body;

        actorCollection.updateOne(
            {
                _id: id
            },
            {
                $set: data
            }
        )
            .then((result) => {

                if (result.matchedCount === 0) {
                    return res.status(404).json({
                        error: 'Actor no encontrado'
                    });
                }

                res.status(200).json({
                    message: 'Actor actualizado',
                    result
                });
            })
            .catch((error) => {
                res.status(500).json({
                    error: 'Error al actualizar actor',
                    message: error.message
                });
            });

    } catch (error) {
        res.status(400).json({
            error: 'Id mal formado'
        });
    }

};


// ELIMINAR ACTOR
export const handleDeleteActorByIdRequest = async (req, res) => {

    try {
        const id = new ObjectId(req.params.id);

        actorCollection.deleteOne({
            _id: id
        })
            .then((result) => {

                if (result.deletedCount === 0) {
                    return res.status(404).json({
                        error: 'Actor no encontrado'
                    });
                }

                res.status(200).json({
                    message: 'Actor eliminado',
                    result
                });
            })
            .catch((error) => {
                res.status(500).json({
                    error: 'Error al eliminar actor',
                    message: error.message
                });
            });

    } catch (error) {
        res.status(400).json({
            error: 'Id mal formado'
        });
    }

};