import { Router } from 'express';
import { checkToken } from '../middlewares/checkToken.js';
import TicketController from '../controllers/ticketControllers.js';

const controllers = new TicketController();
const router = Router();

router.post('/cart/:cartId', checkToken, controllers.generateTicket);

export default router;