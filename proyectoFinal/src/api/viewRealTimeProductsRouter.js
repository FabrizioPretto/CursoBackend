import { __dirname } from "../utils.js";

import ProductMongoDao from '../persistence/daos/mongodb/products/productDao.js';
const productsDao = new ProductMongoDao();
import { Router } from "express";
const router = Router();

router.get('/', async (req, res) => {
    let productsArray = await productsDao.getProducts();
    res.render('realTimeProducts', { productsArray });
});


export default router;
