import { Router } from "express";
import CartControllers from "../controllers/cartControllers.js";
const controllers = new CartControllers();
const router = Router();

router.post('/', controllers.create);

router.post('/:idCart/product/:idProd', controllers.addProdToCart);

router.get('/', controllers.getAll);

router.get('/:id', controllers.getByIdWithPopulate);//controllers.getById

router.delete('/:cid/product/:pid', controllers.removeProdFromCart);

router.delete('/:id', controllers.remove);

router.put('/:id', controllers.update);//Actualiza Stock

router.put('/:cid/product/:pid', controllers.updateProdQuantityToCart);


export default router;




/*
import { Router } from "express";
const router = Router();

import { CartManager } from "../daos/fileSystem/cartManager.js";
const cartManager = new CartManager("./src/files/carts.json");

import { ProductManagerMongoDB } from "../daos/mongodb/productMongodbManager.js";
const productManagerMongoDB = new ProductManagerMongoDB("./src/files/products.json");

router.get('/', async (req, res) => {

    const allCarts = await cartManager.getCarts();
    if (allCarts === undefined || allCarts === false) res.status(404).json({ message: 'Carrito no encontrado' });
    else res.status(200).json(allCarts);

})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const carts = await cartManager.getCartById(Number(cid));
    if (carts === undefined || carts === false) res.status(404).json({ message: 'Carrito no encontrado' });
    else res.status(200).json(carts);

})

router.post('/', async (req, res) => {
    try {
        const cartCreated = await cartManager.createCart();
        res.status(200).json({ message: `Se creó correctamente el carrito:  ` + JSON.stringify(cartCreated) });
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.post('/:idCart/product/:idProd', async (req, res) => {
    const { idCart } = req.params;
    const { idProd } = req.params;

    /*let product = await productManager.getProductById(Number(idProd));
    let cart = await cartManager.getCartById(Number(idCart));


    if (product === undefined
        || product === false
        || cart === undefined
        || cart === false) res.status(404).json({ message: "Product or Cart not found" });
    else {
try {
    const productToSave = await cartManager.saveProductToCart(Number(idCart), Number(idProd))
    res.status(200).json(productToSave);
} catch (error) {
    res.status(500).json(error.message);
}
    //}
})
*/