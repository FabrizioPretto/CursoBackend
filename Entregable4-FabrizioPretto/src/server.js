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

const httpServer = app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
});

const socketServer = new Server(httpServer);