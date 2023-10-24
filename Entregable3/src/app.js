import express from 'express';
import { products } from './products.js';
//import productManager from './productManager.js';

const app = express();

app.get('/', (req, res) => {
    res.send("Mi primer servidor con express");
})

app.get('/home', (req, res) => {
    res.send("Bienvenido");
})

app.get('/products', (req, res) => {

    const { limit } = req.query;

    if (isNaN(parseInt(limit)) || parseInt(limit) === 0)
        res.status(200).json(products);
    else {
        const array = [];
        const productsFilter = products;
        for (let index = 0; index < parseInt(limit); index++) {
            array.push(productsFilter[index])
        }
        res.status(200).json(array);
    }
})

app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find((p) => p.id === parseInt(id));
    if (product === undefined) res.status(404).json({ message: 'Producto no encontrado' });
    else res.status(200).json(product);
})

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));

//productManager();