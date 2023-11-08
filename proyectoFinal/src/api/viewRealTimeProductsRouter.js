import { __dirname } from "../utils.js";
import { ProductManager } from "../manager/productManager.js";
const productManager = new ProductManager('./src/files/products.json');
import { Router } from "express";
const router = Router();

router.get('/', async (req, res) => {
    let productsArray = await productManager.getProducts();
    res.render('realTimeProducts', { productsArray });
});


export default router;
