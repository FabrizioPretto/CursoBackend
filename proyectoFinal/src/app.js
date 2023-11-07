import express from "express";
import productRouter from '../src/api/productRouter.js';
import cartRouter from '../src/api/cartRouter.js';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.get('/', (req, res) => {
    res.render('websocket');
})


const PORT = 8080;

const httpServer = app.listen(PORT, () =>
    console.log(`Server ok on port ${PORT}`));

const socketServer = new Server(httpServer);


socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado ${socket.id}`);

    socket.on('disconnect', () => console.log(`Usuario desconectado ${socket.id}`));
});
