import { Router } from "express";
import { sendSms } from "../../controllers/others/smsControllers.js";

const router = Router();

router.post('/sms', sendSms)

export default router;