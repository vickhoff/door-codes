import express from "express";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", authenticate, (req, res) => {                                         
    const { _id, name, email, role } = req.user;
    res.json({ _id, name, email, role });
});

export default router