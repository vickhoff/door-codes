import 'dotenv/config';
import mongoose from "mongoose";

const connectToDatabase = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "door-codes"
    })
    console.log("MongoDB Connected");
}



export { connectToDatabase };

