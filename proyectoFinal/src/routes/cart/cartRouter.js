import { Router } from "express";
import CartControllers from "../../controllers/cart/cartControllers.js";
import { checkToken } from "../../middlewares/checkToken.js";
import { verifyToken } from "../../middlewares/verifyToken.js"
const controllers = new CartControllers();
const router = Router();

router.post('/', verifyToken, controllers.createCart);

router.post('/:idCart/product/:idProd', verifyToken, controllers.addProdToCart);

router.get('/', verifyToken, controllers.getAllCarts);

router.get('/:id', verifyToken, controllers.getByIdWithPopulate);

router.delete('/:cid/product/:pid', verifyToken, controllers.removeProdFromCart);

router.delete('/:id', verifyToken, controllers.remove);

router.delete('/clearcart/:cid', verifyToken, controllers.clearCart);

router.put('/:cid/product/:pid', verifyToken, controllers.updateProdQuantityToCart);

export default router;

