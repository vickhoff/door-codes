import express from "express";
import { authenticate } from "../middleware/auth.js";
import { autoComplete, latLong } from "../controllers/address.js";

const router = express.Router();

router.post('/autocomplete', authenticate, autoComplete);
router.post('/latlong', authenticate, latLong);

export default router;