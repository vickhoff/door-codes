import 'dotenv/config';
import { MongoClient, ObjectId } from "mongodb";

const mongoPort = process.env.MONGO_PORT;
const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri);
let db;
console.log(mongoUri)

export const connectToDatabase = async () => {
    await client.connect();
    db = client.db("door-codes");
    console.log(`MongoDB is running on ${mongoPort}`)
}

export const addItem = async (item) => {
    const collection = db.collection("items");
    const data = await collection.insertOne(item);
    return data;
}

export const removeItem = async (id) => {
    const collection = db.collection("items");
    const deleteResult = await collection.deleteOne({ _id: ObjectId.createFromHexString(id) });
    console.log('Deleted documents: ', deleteResult);
}

