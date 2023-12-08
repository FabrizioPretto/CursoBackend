import { __dirname } from "../utils.js";
//import { ProductManagerFS } from "../daos/fileSystem/productManager.js";
//const productManagerFS = new ProductManagerFS('./src/files/products.json');
import { Router } from "express";
const router = Router();

//rutas de login, registro y perfil



router.get('/', async (req, res) => {
    res.render('login')
})

router.get('/register', async (req, res) => {
    res.render('register')
})

router.get('/profile', async (req, res) => {
    res.render('profile')
})

router.get('/register-error', async (req, res) => {
    res.render('register-error')
})


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