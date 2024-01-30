import { Router } from 'express';
import Controllers from '../controllers/productControllers.js';

const controllers = new Controllers();
const router = Router();

router.post('/', controllers.generateMockProducts);

export default router;
