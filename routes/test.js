import express from "express";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/user", authenticate, (req, res) => {
    res.json({
        user: req.user
    })
})

export default router