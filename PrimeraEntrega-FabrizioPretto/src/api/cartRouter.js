import { Router } from "express";
const router = Router();

import { CartManager } from "../manager/cartManager.js";
const cartManager = new CartManager('./src/carts.json');

import { ProductManager } from "../manager/productManager.js";
const productManager = new ProductManager("./src/products.json");


router.post('/', async (req, res) => {
    try {
        const cartCreated = await cartManager.createCart();
        console.log(JSON.stringify(cartCreated));
        res.status(200).json({ message: `Se creó correctamente el carrito:  ` + JSON.stringify(cartCreated) });
    } catch (error) {
        res.status(500).json(error.message);
    }
})


router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(Number(cid));
    console.log("El cart del get " + cart);
    if (cart === undefined || cart === false) res.status(404).json({ message: 'Carrito no encontrado' });
    else res.status(200).json(cart);

})


router.post('/:idCart/product/:idProd', async (req, res) => {
    const { idProd } = req.params;
    const { idCart } = req.params;

    const product = await productManager.getProductById(Number(idProd));
    const cart = await cartManager.getCartById(Number(idCart));


    if (product === undefined || product === false || cart === undefined || cart === false) res.status(404).json({ message: "Product or Cart not found" });
    else {
        try {
            const productToSave = await cartManager.saveProductToCart(Number(idCart), Number(idProd))
            console.log("productToSave " + JSON.stringify(productToSave));
            res.status(200).json(productToSave);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
})


export default router;