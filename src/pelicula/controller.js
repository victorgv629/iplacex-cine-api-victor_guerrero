import { client, DB_NAME } from '../common/db.js';
import { ObjectId } from 'mongodb';

const peliculaCollection = client.db(DB_NAME).collection('peliculas');


// CREAR PELÍCULA
export const handleInsertPeliculaRequest = async (req, res) => {

    const data = req.body;

    peliculaCollection.insertOne(data)
        .then((result) => {
            res.status(201).json({
                message: 'Película creada exitosamente',
                result
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Error al insertar película',
                message: error.message
            });
        });

};


// OBTENER TODAS LAS PELÍCULAS
export const handleGetPeliculasRequest = async (req, res) => {

    peliculaCollection.find({}).toArray()
        .then((peliculas) => {
            res.status(200).json(peliculas);
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Error al obtener películas',
                message: error.message
            });
        });

};


// OBTENER PELÍCULA POR ID
export const handleGetPeliculaByIdRequest = async (req, res) => {

    try {

        const id = new ObjectId(req.params.id);

        peliculaCollection.findOne({
            _id: id
        })
            .then((pelicula) => {

                if (!pelicula) {
                    return res.status(404).json({
                        error: 'Película no encontrada'
                    });
                }

                res.status(200).json(pelicula);

            })
            .catch((error) => {

                res.status(500).json({
                    error: 'Error al obtener película',
                    message: error.message
                });

            });

    } catch (error) {

        res.status(400).json({
            error: 'Id mal formado'
        });

    }

};


// ACTUALIZAR PELÍCULA
export const handleUpdatePeliculaByIdRequest = async (req, res) => {

    try {

        const id = new ObjectId(req.params.id);
        const data = req.body;

        peliculaCollection.updateOne(
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
                        error: 'Película no encontrada'
                    });
                }

                res.status(200).json({
                    message: 'Película actualizada',
                    result
                });

            })
            .catch((error) => {

                res.status(500).json({
                    error: 'Error al actualizar película',
                    message: error.message
                });

            });

    } catch (error) {

        res.status(400).json({
            error: 'Id mal formado'
        });

    }

};


// ELIMINAR PELÍCULA
export const handleDeletePeliculaByIdRequest = async (req, res) => {

    try {

        const id = new ObjectId(req.params.id);

        peliculaCollection.deleteOne({
            _id: id
        })
            .then((result) => {

                if (result.deletedCount === 0) {
                    return res.status(404).json({
                        error: 'Película no encontrada'
                    });
                }

                res.status(200).json({
                    message: 'Película eliminada',
                    result
                });

            })
            .catch((error) => {

                res.status(500).json({
                    error: 'Error al eliminar película',
                    message: error.message
                });

            });

    } catch (error) {

        res.status(400).json({
            error: 'Id mal formado'
        });

    }

};