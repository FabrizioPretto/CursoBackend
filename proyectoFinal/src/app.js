import express from "express";
import "./config/connection.js";
import MainRouter from "./routes/index.js";
const mainRouter = new MainRouter();
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "../src/utils/utils.js";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import './passport/strategies.js';
import passport from "passport";
import './passport/githubStrategy.js';
import './passport/googleStrategy.js';
import 'dotenv/config';
import { errorHandler } from "./middlewares/errorHandler.js";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;//Agregué esta línea porque recibíaun error "error self signed certificate in certificate chain"
import { info } from "./docs/info.js";
import swaggerUI from 'swagger-ui-express';
import swaggerJSDOC from 'swagger-jsdoc';



const app = express();

const specs = swaggerJSDOC(info);


const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://fgpretto:F4br1z10@pretto.aiozw0c.mongodb.net/ecommerce?retryWrites=true&w=majority',
        ttl: 120,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 120000,
    }
};

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());
app.use(cookieParser());
app.use(session(mongoStoreOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//antes de las rutas
app.use(passport.initialize());
app.use(passport.session());


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use('/', mainRouter.getRouter());
app.use(errorHandler);


const PORT = process.env.PORT || 8080;

const httpServer = app.listen(PORT, () =>
    console.log(`Server ok on port ${PORT}`));


const socketServer = new Server(httpServer);



socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado ${socket.id}`);

    socket.on('disconnect', () => console.log(`Usuario desconectado ${socket.id}`));

    socket.on('newProduct', async (product) => {
        const newProduct = await productManager.addProduct(product);

        socketServer.emit('arrayProducts', await productManager.getProducts());
    })

});

export default app;
