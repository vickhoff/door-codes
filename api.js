import { addItem, connectToDatabase, removeItem, listItems } from "./database.js";

import express from "express";

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

app.post("/api/add", async (req, res) => {
    const { name, address, code } = req.body
    const newItem = { name, address, code };

    const requiredFields = ["name", "address", "code"];
    const missingFields = requiredFields.filter(field => !newItem[field])

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: "Missing required fields",
            missingFields: missingFields
        })
    }
    const data = await addItem(newItem);
    res.status(200)
            .json(data)
    })

app.get("/api/items", async (req, res) => {
        const data = await listItems();
        res.status(200)
            .json(data);
    })

app.delete("/api/delete/:id", async (req, res) => {
        await removeItem(req.params.id)
        console.log("Item deleted");
        res.status(200)
})

app.use ((error, req, res, next) => {
    console.error(error)
    const statusCode = error.status || 500;
    const message = error.message || "Something went wrong"; 
    res.status (statusCode).json({
        message: message
    })
})

startApp()




