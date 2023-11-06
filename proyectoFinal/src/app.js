import express from "express";
import productRouter from '../src/api/productRouter.js';
import cartRouter from '../src/api/cartRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));