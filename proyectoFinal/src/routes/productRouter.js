import { Router } from "express";
import ProductController from '../controllers/productControllers.js'
const prodController = new ProductController()
//import * as controller from "../controllers/productControllers.js";

const router = Router();

router.get('/sort', prodController.aggregationBySort);

router.get('/:limit', prodController.aggregationByLimit);

router.get('/', prodController.getAllProducts);

router.post('/', prodController.createProduct);

router.get("/:id", prodController.getProductById);

router.delete('/:id', prodController.deleteProduct);

router.put('/:id', prodController.updateProduct);

router.get('/dto/:id', prodController.getProdById);

export default router;
