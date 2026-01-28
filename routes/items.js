import express from "express"
import { createItem, deleteItem, getItems, getItem, updateItem } from "../controllers/items.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authenticate, createItem);
router.get("/", authenticate, getItems);
router.patch("/update/:id", authenticate, updateItem)
router.get("/:id", authenticate, getItem);
router.delete("/delete/:id", authenticate, deleteItem)

export default router;