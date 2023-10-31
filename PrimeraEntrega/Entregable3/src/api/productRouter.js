import { Router } from "express";
const router = Router();

import { ProductManager } from "../manager/productManager.js";
import { productValidator } from "../middlewares/productValidator.js";
const productManager = new ProductManager("./src/products.json")

//router.use(router.json());
//router.use(router.urlencoded({ extended: true }));

router.get('/', async (req, res) => {

    const { limit } = req.query;

    const products = await productManager.getProducts()

    if (isNaN(parseInt(limit)) || parseInt(limit) <= 0 || limit === undefined) {

        res.status(200).json(products);
    }
    else {
        try {
            const productsFilter = await productManager.getProducts();
            res.status(200).json(productsFilter.splice(0, limit));
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
})


//router.post('/', productValidator, async (req, res) => {
router.post('/', async (req, res) => {
    try {
        const product = { ...req.body }
        const productCreated = await productManager.addProduct(product);
        //console.log("El created: " + productCreated);
        res.status(200).json({ message: `Se creó correctamente el producto:  ` + productCreated.title });
    } catch (error) {
        res.status(500).json(error.message);
    }
})


router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const product = await productManager.getProductById(Number(id));

    if (product === undefined || product === false) res.status(404).json({ message: 'Producto no encontrado' });
    else res.status(200).json(product);
})// else res.status(200).json(JSON.parse(product));


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const idNumber = Number(id)
        await productManager.deleteProduct(idNumber)
        res.json({ message: `El producto con id: ${id} ha sido eliminado` });
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.put('/:id', async (req, res) => {

    try {
        const product = { ...req.body }
        const { id } = req.params;
        const idNumber = Number(id);

        const productOk = await productManager.getProductById(Number(id));

        if (!productOk) res.status(404).json({ message: "Product not found" });
        else {
            await productManager.updateProduct(product, idNumber);
            res.status(200).json({ message: `Producto con id: ${id} actualizado` });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
})


export default router;