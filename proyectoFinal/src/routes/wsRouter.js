import { Router } from "express";
import { sendWS } from "../controllers/wsControllers.js";
const router = Router();

router.post('/whatsapp', sendWS);

export default router;