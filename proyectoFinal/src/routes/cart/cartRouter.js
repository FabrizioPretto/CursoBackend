import { Router } from "express";
import CartControllers from "../../controllers/cart/cartControllers.js";
import { checkToken } from "../../middlewares/checkToken.js";
const controllers = new CartControllers();
const router = Router();

router.post('/', checkToken, controllers.createCart);

router.post('/:idCart/product/:idProd', checkToken, controllers.addProdToCart);

router.get('/', checkToken, controllers.getAllCarts);

router.get('/:id', checkToken, controllers.getByIdWithPopulate);

router.delete('/:cid/product/:pid', checkToken, controllers.removeProdFromCart);

router.delete('/:id', checkToken, controllers.remove);

router.delete('/clearcart/:cid', checkToken, controllers.clearCart);

router.put('/:cid/product/:pid', checkToken, controllers.updateProdQuantityToCart);

export default router;

