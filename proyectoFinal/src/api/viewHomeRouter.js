import { __dirname } from "../utils.js";
import { ProductManager } from "../manager/productManager.js";
const productManager = new ProductManager('./src/files/products.json');
import { Router } from "express";
const router = Router();



/*router.get('/', (req, res) => {
    res.render('home', { productsArray });
})*/

router.get('/', async (req, res) => {
    let productsArray = await productManager.getProducts();

    //let products = JSON.parse(productsArray);
    //console.log(products);
    res.render('home', { productsArray })
})


export default router;