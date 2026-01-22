import express from "express"
import { createItem, deleteItem, getItems } from "../controllers/items.js";

const router = express.Router();

router.post("/add", createItem);
router.get("/", getItems);
router.delete("/delete/:id", deleteItem)

export default router;