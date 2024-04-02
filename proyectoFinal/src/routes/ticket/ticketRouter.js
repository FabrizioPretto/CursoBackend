import { Router } from 'express';
import { checkToken } from '../../middlewares/checkToken.js';
import TicketController from '../../controllers/ticket/ticketControllers.js';

const controllers = new TicketController();
const router = Router();

router.post('/:cartId', checkToken, controllers.generateTicket);

export default router;