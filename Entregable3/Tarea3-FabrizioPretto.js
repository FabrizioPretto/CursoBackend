import express from 'express';
import { products } from './products.js';

const app = express();

app.get('/', (req, res) => {
    res.send("Mi primer servidor con express");
})

app.get('/home', (req, res) => {
    res.send("Bienvenido");
})


//products?value=1 se accede como req.query.value y llega como string

app.get('/products', (req, res) => {
    res.send(products);
    //res.redirect('/home');
    //res.render('products');
})

app.get('/filter-products', (req, res) => {
    console.log(req.query)
    const { value } = req.query;
    const productsFilter = products.filter(p => p.price >= parseInt(value));
    res.json(productsFilter);
})

//PRECIO MAYOR O IGUAL A: _value_ [BUSCAR] --> GET localhost:8080/products?value=${value}


const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));