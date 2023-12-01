import { __dirname } from "../utils.js";
import { ProductManagerFS } from "../daos/fileSystem/productManager.js";
const productManagerFS = new ProductManagerFS('./src/files/products.json');
import { Router } from "express";
const router = Router();

router.get('/', async (req, res) => {
    let productsArray = await productManagerFS.getProducts();
    res.render('realTimeProducts', { productsArray });
});


export default router;
