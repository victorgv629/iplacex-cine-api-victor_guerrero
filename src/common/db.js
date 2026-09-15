import { MongoClient } from 'mongodb';

const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cine-db';
const DB_NAME = 'cine-db';

const client = new MongoClient(URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    retryWrites: true,
    maxPoolSize: 10,
});

export { client, DB_NAME };
