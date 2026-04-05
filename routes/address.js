import express from "express";
import { authenticate } from "../middleware/auth.js";
import { autoComplete } from "../controllers/address.js";

const router = express.Router();

router.post('/autocomplete', authenticate, autoComplete);

export default router;