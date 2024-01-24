import { Router } from 'express';
import { sendGmail } from '../controllers/emailControllers.js';

const router = Router();

router.post('/gmail', sendGmail);

export default router;