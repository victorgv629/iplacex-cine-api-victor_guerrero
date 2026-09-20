import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { client } from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Bienvenido al cine Iplacex');
});

app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);


const startServer = async () => {
    try {
        await client.connect();

        console.log('Conexión a MongoDB exitosa.');

        app.listen(PORT, () => {
            console.log(`Servidor de Express escuchando en el puerto ${PORT}`);
        });

    } catch (error) {

        console.error('Error de conexión MongoDB:', error.message);

    }
};


startServer();