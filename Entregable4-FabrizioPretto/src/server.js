import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get('/', (req, res) => {
    res.render('websocket');
})

app.post('/', (req, res) => {
    const { msg } = req.body;
    socketServer.emit('message', msg);
    res.send("Se envió el mensaje al socket del cliente")
})

//Este método y la línea de abajo es la generación del servidor websocket
//la lista de products es similar al ejemplo de la clase de motores de plantillas. Se hace con un res.render
const httpServer = app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
});

const socketServer = new Server(httpServer);

const products = [];//luego voy pusheando



socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado ${socket.id}`);

    socket.on('disconnect', () => console.log(`Usuario desconectado ${socket.id}`));

    socket.emit('saludoDesdeBack', "Bienvenido a websocket");

    socket.on('respuestaDesdeFront', (msg) => {
        console.log(msg);
    });

    socket.on('newProduct', (product) => {
        products.push(product);
        socketServer.emit('arrayProducts', products);
    })
})
