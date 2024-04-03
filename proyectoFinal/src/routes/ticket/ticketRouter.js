import { Router } from 'express';
import TicketController from '../../controllers/ticket/ticketControllers.js';
import { verifyToken } from '../../middlewares/verifyToken.js'
const controllers = new TicketController();
const router = Router();

router.post('/:cartId', verifyToken, controllers.generateTicket);

export default router;