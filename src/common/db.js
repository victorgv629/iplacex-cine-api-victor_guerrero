import { MongoClient } from 'mongodb';

const URI = process.env.MONGODB_URI;
const DB_NAME = 'cine-db';

const client = new MongoClient(URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    retryWrites: true,
    maxPoolSize: 10
});

export { client, DB_NAME };