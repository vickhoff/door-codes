import express from "express";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", authenticate, (req, res) => {
    const { _id, username, email, role } = req.user;
    res.json({
        message: `Welcome ${_id, username, email, role}`
    })
})

export default router