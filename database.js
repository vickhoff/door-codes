import 'dotenv/config';
import { MongoClient, ObjectId } from "mongodb";

const mongoPort = process.env.MONGO_PORT;
const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri);
let db;
console.log(mongoUri)

const connectToDatabase = async () => {
    await client.connect();
    db = client.db("door-codes");
    console.log(`MongoDB is running on ${mongoPort}`)
}

const listItems = async () => {
    const collection = db.collection("items");
    const data = await collection.find().toArray();
    return data;
}

const addItem = async (item) => {
    const collection = db.collection("items");
    const data = await collection.insertOne(item);
    return data;
}

const removeItem = async (id) => {
    const collection = db.collection("items");
    const deleteResult = await collection.deleteOne({ _id: ObjectId.createFromHexString(id) });
    console.log('Deleted documents: ', deleteResult);
    
    if (deleteResult.deletedCount === 0) {
        const error = new Error("Item wasn't found.");
        error.status = 404;
        throw error;
    }
}

export { connectToDatabase, listItems, addItem, removeItem };

