import { Router } from 'express';
import { sendGmail } from '../../controllers/others/emailControllers.js';

const router = Router();

router.post('/gmail', sendGmail);

export default router;