import 'dotenv/config';
import { MongoClient } from 'mongodb';

// Connection URL
const url:string = `${process.env.LOCAL_MONGODB_URL}`;
const client = new MongoClient(url);

export const dbConnection = async (collectionName: string) => {
    await client.connect();
    const db = client.db(process.env.LOCAL_MONGO_BD);
    return db.collection(collectionName);
};