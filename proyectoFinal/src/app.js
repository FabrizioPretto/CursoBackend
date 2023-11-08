import express from "express";
import productRouter from '../src/api/productRouter.js';
import cartRouter from '../src/api/cartRouter.js';
import viewRealTimeProductRouter from './api/viewRealTimeProductsRouter.js';
import viewHomeRouter from './api/viewHomeRouter.js';
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/realtimeproducts', viewRealTimeProductRouter);
app.use('/', viewHomeRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () =>
    console.log(`Server ok on port ${PORT}`));

const socketServer = new Server(httpServer);

const products = [];

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado ${socket.id}`);

    socket.on('disconnect', () => console.log(`Usuario desconectado ${socket.id}`));

    socket.emit('offer', `GRAN DESCUENTO EN LAS PRÓXIMAS 2 HS`)

    socket.on('newProduct', (product) => {
        products.push(product);
        socketServer.emit('arrayProducts', products);
    })

});
