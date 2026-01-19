import { addItem, connectToDatabase, removeItem } from "./database.js";

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

app.post("/add", async (req, res) => {
    const { name, address, code } = req.body
    try {
        const newItem = { name, address, code };
        const data = await addItem(newItem);
        console.log(`${name} was added succesfully`)
        res.status(200).json(data)
    } catch {
        res.sendStatus(500);
    }
})

app.delete("/delete/:id", async (req, res) => {
    try {
        await removeItem(req.params.id)
        res.sendStatus(200)
    } catch(error) {
        console.error()
        res.sendStatus(500);
    }
})

startApp()




