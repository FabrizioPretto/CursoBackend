import { Router } from 'express';
import Controllers from '../../controllers/products/productControllers.js';

const controllers = new Controllers();
const router = Router();

router.post('/', controllers.generateMockProducts);

export default router;
