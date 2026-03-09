import { connectToDatabase } from "./database.js";
import express from "express";

import itemsRouter from "./routes/items.js";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

const app = express();
app.use(express.json());
const appPort = 3000;

// Ensure DB connection before handling requests (cached in database.js)
app.use(async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (error) {
        next(error);
    }
});

app.use("/api/items", itemsRouter);
app.use("/api/user", usersRouter);
app.use("/api/auth", authRouter);

app.use((error, req, res, next) => {
    console.error(error);
    const statusCode = error.status || 500;
    const message = error.message || "Something went wrong";
    res.status(statusCode).json({
        message: message
    });
});

const startApp = async () => {
    try {
        await connectToDatabase();
        if (!process.env.VERCEL) {
            app.listen(appPort, () => {
                console.log(`Server is running on http://localhost:${appPort}`);
            });
        }
    } catch (error) {
        console.error(error);
    }
};

startApp();

export default app;




