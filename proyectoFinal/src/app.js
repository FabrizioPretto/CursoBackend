import express from "express";
import "./config/connection.js";
/*import productRouter from '../src/api/productRouter.js';
import cartRouter from '../src/api/cartRouter.js';
import viewRealTimeProductRouter from './api/viewRealTimeProductsRouter.js';
import viewsRouter from './api/viewsRouter.js';
import userRouter from './api/userRouter.js';*/
import MainRouter from "./routes/index.js";
const mainRouter = new MainRouter();
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
//import { ProductManagerMongoDB } from "./daos/mongodb/productMongodbManager.js";
//const productManager = new ProductManagerMongoDB();
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import './passport/strategies.js';
import passport from "passport";
import './passport/githubStrategy.js';
import './passport/googleStrategy.js';
import 'dotenv/config';
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;//Agregué esta línea porque recibíaun error "error self signed certificate in certificate chain"
//initMongoDB();
/*const secretKey = '1234';
app.use(cookieParser(secretKey));*/

const app = express();
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

/*app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/realtimeproducts', viewRealTimeProductRouter);
app.use('/', viewsRouter);
app.use('/users', userRouter);*/

//const persistence = process.env.PERSISTENCE;



const PORT = process.env.PORT || 8080;

const httpServer = app.listen(PORT, () =>
    console.log(`Server ok on port ${PORT}`));

const socketServer = new Server(httpServer);

//const products = [];

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado ${socket.id}`);

    socket.on('disconnect', () => console.log(`Usuario desconectado ${socket.id}`));

    socket.on('newProduct', async (product) => {
        const newProduct = await productManager.addProduct(product);
        //products.push(product);
        socketServer.emit('arrayProducts', await productManager.getProducts());
    })

    //socket.emit('offer',)

});


