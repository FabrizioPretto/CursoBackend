import express, { json } from 'express';
//import { products } from './products.js';
import { ProductManager } from './productManager.js';

const productManager = new ProductManager('./src/products.json');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Mi primer servidor con express");
})

app.get('/home', (req, res) => {
    res.send("Bienvenido");
})

app.get('/products', async (req, res) => {

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



app.post('/products', async (req, res) => {
    try {
        const product = { ...req.body }
        const productCreated = await productManager.addProduct(product);
        res.status(200).json({ message: "Se creó correctamente el producto: " + productCreated.title });
    } catch (error) {
        res.status(500).json(error.message);
    }
})


app.get("/products/:id", async (req, res) => {
    const { id } = req.params;

    const product = await productManager.getProductById(Number(id));

    if (product === undefined || product === false) res.status(404).json({ message: 'Producto no encontrado' });
    else res.status(200).json(product);
})// else res.status(200).json(JSON.parse(product));


app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const idNumber = Number(id)
        await productManager.deleteProduct(idNumber)
        res.json({ message: `El producto con id: ${id} ha sido eliminado` });
    } catch (error) {
        res.status(500).json(error.message);
    }
})

app.put('/products/:id', async (req, res) => {

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




const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));
