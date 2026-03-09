import 'dotenv/config';
import mongoose from "mongoose";

const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) {
        return; // Already connected
    }
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "door-codes"
    });
};



export { connectToDatabase };

