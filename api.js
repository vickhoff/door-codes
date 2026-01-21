import { connectToDatabase } from "./database.js";  // ✅ Named import
import express from "express";
import itemsRouter from "./routes/items.js";

// ... rest of file stays the same


const app = express();
app.use(express.json());
const appPort = 3000;

const startApp = async () => {
    try {
        await connectToDatabase()

        app.listen(appPort, () => {
            console.log(`Server is running on http://localhost:${appPort}`)
        })
    } catch (error) {
        console.error(error)
    }
}

app.use("/api", itemsRouter);

app.use ((error, req, res, next) => {
    console.error(error)
    const statusCode = error.status || 500;
    const message = error.message || "Something went wrong"; 
    res.status (statusCode).json({
        message: message
    })
})

startApp()




