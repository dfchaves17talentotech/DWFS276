import 'dotenv/config';
import { MongoClient } from 'mongodb';

// Connection URL
const url:string = `mongodb+srv://dfchaves17:${process.env.LOCAL_MONGODB_PASSWORD}@talentotech.7cozw.mongodb.net/?retryWrites=true&w=majority&appName=TalentoTech`;
const client = new MongoClient(url);

export const dbconnection = async (dbName: string, collectionToFind: string) => {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection(collectionToFind);
    const filteredDocs = await collection.find({ title: "A Corner in Wheat" }).toArray();    
    console.log('Found documents =>', filteredDocs);
    return filteredDocs;
};