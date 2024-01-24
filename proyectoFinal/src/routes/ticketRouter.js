import { Router } from 'express';
import * as controller from '../controllers/ticketControllers.js';
import { checkToken } from '../middlewares/checkToken.js';

const router = Router();

router.post('/cart/:cartId', checkToken, controller.generateTicket);

export default router;