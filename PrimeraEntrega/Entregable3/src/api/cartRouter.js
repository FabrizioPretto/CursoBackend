import { Router } from "express";
const router = Router();

import { CartManager } from "../manager/cartManager.js";
const cartManager = new CartManager('./src/cart.json')

import { ProductManager } from "../manager/productManager.js";
const productManager = new ProductManager("./src/products.json")



router.post('/', async (req, res) => {
    try {
        const cartCreated = await cartManager.createCart();
        res.status(200).json({ message: `Se creó correctamente el carrito:  ` + JSON.stringify(cartCreated) });
    } catch (error) {
        res.status(500).json(error.message);
    }
})


router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(Number(cid));
    console.log("El cart " + cart);
    if (cart === undefined || cart === false) res.status(404).json({ message: 'Carrito no encontrado' });
    else res.status(200).json(cart);

    /*try {
        const carts = await cartManager.getCarts();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error.message);
    }*/
})


router.post('/:idCart/product/:idProd', async (req, res) => {
    const { idProd } = req.params;
    const { idCart } = req.params;

    const product = await productManager.getProductById(Number(idProd));
    const cart = await cartManager.getCartById(Number(idCart));

    /*console.log("El product: " + product);
    console.log("El cart: " + cart);*/

    if (product === undefined || product === false || cart === undefined || cart === false) res.status(404).json({ message: "Product not found" });
    else {
        try {
            const productToSave = await cartManager.saveProductToCart(Number(idCart), Number(idProd))
            res.status(200).json(productToSave);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
})





/*
router.post('/:id/', async (req, res) => {
    try {
        const product = { ...req.body }
        const productCreated = await productManager.addProduct(product);
        //console.log("El created: " + productCreated);
        res.status(200).json({ message: `Se creó correctamente el producto:  ` + productCreated.title });
    } catch (error) {
        res.status(500).json(error.message);
    }
})*/


export default router;