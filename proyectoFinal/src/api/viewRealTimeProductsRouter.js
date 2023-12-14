import { __dirname } from "../utils.js";

import { ProductManagerMongoDB } from "../daos/mongodb/productMongodbManager.js";
const productsDao = new ProductManagerMongoDB();
import { Router } from "express";
const router = Router();

router.get('/', async (req, res) => {
    let productsArray = await productsDao.getAllProducts();
    res.render('realTimeProducts', { productsArray });
});


export default router;
