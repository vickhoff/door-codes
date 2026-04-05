import express from "express";
import { autoComplete } from "../controllers/address.js";

const router = express.Router();

router.post('/autocomplete', autoComplete);

export default router;