import { connectToDatabase } from "./database.js";
import express from "express";


import itemsRouter from "./routes/items.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import testRouter from "./routes/test.js";

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

app.use("/api/items", itemsRouter);
app.use("/api/user", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/test", testRouter);

app.use ((error, req, res, next) => {
    console.error(error)
    const statusCode = error.status || 500;
    const message = error.message || "Something went wrong"; 
    res.status (statusCode).json({
        message: message
    })
})

startApp()




