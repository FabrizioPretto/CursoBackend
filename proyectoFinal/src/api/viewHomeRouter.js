import { __dirname } from "../utils.js";
import { ProductManagerFS } from "../daos/fileSystem/productManager.js";
const productManagerFS = new ProductManagerFS('./src/files/products.json');
import { Router } from "express";
const router = Router();



/*router.get('/', (req, res) => {
    res.render('home', { productsArray });
})*/

router.get('/', async (req, res) => {
    let productsArray = await productManagerFS.getProducts();

    //let products = JSON.parse(productsArray);
    //console.log(products);
    res.render('home', { productsArray })
})


export default router;