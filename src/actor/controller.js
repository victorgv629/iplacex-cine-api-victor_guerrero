import { client, DB_NAME } from '../common/db.js';
import { ObjectId } from 'mongodb';


const actorCollection = client.db(DB_NAME).collection('actores');
const peliculaCollection = client.db(DB_NAME).collection('peliculas');


// CREAR ACTOR
export const handleInsertActorRequest = async (req, res) => {

    const data = req.body;

    try {

        const pelicula = await peliculaCollection.findOne({
            _id: new ObjectId(data.idPelicula)
        });


        if (!pelicula) {
            return res.status(400).json({
                error: 'La película asignada no existe'
            });
        }


        data.idPelicula = pelicula._id.toString();


        const result = await actorCollection.insertOne(data);


        res.status(201).json({
            message: 'Actor creado exitosamente',
            result
        });


    } catch (error) {

        res.status(500).json({
            error: 'Error al insertar actor',
            message: error.message
        });

    }

};



// OBTENER TODOS LOS ACTORES
export const handleGetActoresRequest = async (req, res) => {

    try {

        const actores = await actorCollection.find({}).toArray();

        res.status(200).json(actores);


    } catch (error) {

        res.status(500).json({
            error: 'Error al obtener actores',
            message: error.message
        });

    }

};



// OBTENER ACTOR POR ID
export const handleGetActorByIdRequest = async (req, res) => {

    try {

        const id = new ObjectId(req.params.id);


        const actor = await actorCollection.findOne({
            _id: id
        });


        if (!actor) {

            return res.status(404).json({
                error: 'Actor no encontrado'
            });

        }


        res.status(200).json(actor);


    } catch (error) {

        res.status(400).json({
            error: 'Id mal formado'
        });

    }

};



// OBTENER ACTORES POR PELÍCULA
export const handleGetActoresByPeliculaIdRequest = async (req, res) => {

    try {

        const peliculaId = req.params.pelicula;


        const actores = await actorCollection.find({
            idPelicula: peliculaId
        }).toArray();


        res.status(200).json(actores);


    } catch (error) {

        res.status(500).json({
            error: 'Error al obtener actores de la película',
            message: error.message
        });

    }

};



// ACTUALIZAR ACTOR
export const handleUpdateActorByIdRequest = async (req, res) => {

    try {

        const id = new ObjectId(req.params.id);

        const data = req.body;


        const result = await actorCollection.updateOne(
            {
                _id: id
            },
            {
                $set: data
            }
        );


        if (result.matchedCount === 0) {

            return res.status(404).json({
                error: 'Actor no encontrado'
            });

        }


        res.status(200).json({
            message: 'Actor actualizado',
            result
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


        const result = await actorCollection.deleteOne({
            _id: id
        });



        if (result.deletedCount === 0) {

            return res.status(404).json({
                error: 'Actor no encontrado'
            });

        }


        res.status(200).json({
            message: 'Actor eliminado',
            result
        });



    } catch (error) {

        res.status(400).json({
            error: 'Id mal formado'
        });

    }

};