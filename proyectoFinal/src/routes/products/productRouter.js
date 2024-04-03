import { Router } from "express";
import ProductController from '../../controllers/products/productControllers.js'
import { userKind } from "../../middlewares/userKind.js";
const prodController = new ProductController()

const router = Router();


router.get('/', prodController.getAllProducts);

router.post('/', userKind, prodController.createProduct);

router.delete('/:id', userKind, prodController.deleteProduct);

router.put('/:id', userKind, prodController.updateProduct);

router.get('/dto/:id', prodController.getProdById);

export default router;
