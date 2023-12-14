import { __dirname } from "../utils.js";
//import { ProductManagerFS } from "../daos/fileSystem/productManager.js";
//const productManagerFS = new ProductManagerFS('./src/files/products.json');
import { Router } from "express";
const router = Router();
import { UserManagerMondoDB } from "../daos/mongodb/userManagerMongodb.js";
const userDao = new UserManagerMondoDB();
//rutas de login, registro y perfil
import * as controller from '../controllers/userControllers.js';


router.get('/', async (req, res) => {
    res.render('login')
})

router.get('/register', async (req, res) => {
    res.render('register')
})

router.get('/profile', controller.profile);

router.get('/register-error', async (req, res) => {
    res.render('register-error')
})

router.get("/logout", controller.logout);

export default router;


/*router.get('/', (req, res) => {
    res.render('home', { productsArray });
})

router.get('/', async (req, res) => {
    let productsArray = await productManagerFS.getProducts();
    //let products = JSON.parse(productsArray);
    //console.log(products);
    res.render('home', { productsArray })
})*/