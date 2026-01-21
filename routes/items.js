import express from "express"
import { addItem, removeItem, listItems } from "../database.js";

const router = express.Router();

router.post("/add", async (req, res) => {
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

router.get("/items", async (req, res) => {
        const data = await listItems();
        res.status(200)
            .json(data);
    })

router.delete("/delete/:id", async (req, res) => {
        await removeItem(req.params.id)
        console.log("Item deleted");
        res.status(200)
})

export default router;