import express from "express"
import { createItem, deleteItem, getItems, getItem } from "../controllers/items.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authenticate, createItem);
router.get("/", getItems);
router.get("/:id", getItem);
router.delete("/delete/:id", deleteItem)

export default router;