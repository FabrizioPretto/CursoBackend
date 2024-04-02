import { Router } from "express";
import { sendWS } from "../../controllers/others/wsControllers.js";
const router = Router();

router.post('/whatsapp', sendWS);

export default router;