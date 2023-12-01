import { Router } from "express";

import * as controller from "../controllers/productControllers.js";

const router = Router();

router.get('/', controller.getAllProducts);

router.post('/', controller.createProduct);

router.get("/:id", controller.getProductById);

router.delete('/:id', controller.deleteProduct);

router.put('/:id', controller.updateProduct);

export default router;
