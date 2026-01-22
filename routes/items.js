import express from "express"
import { addItem, removeItem, listItems } from "../services/items.js";

const router = express.Router();

router.post("/add", addItem);
router.get("/items", listItems);
router.delete("/delete/:id", removeItem)

export default router;