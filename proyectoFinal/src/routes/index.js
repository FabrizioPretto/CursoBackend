import { Router } from "express";


import cartRouter from '../routes/cart/cartRouter.js';
import productRouter from '../routes/products/productRouter.js';
import userRouter from '../routes/user/userRouter.js';
import ticketRouter from '../routes/ticket/ticketRouter.js';
import mockingProductsRouter from '../routes/products/mockingProductsRouter.js';


export default class MainRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.use('/api/carts', cartRouter);
        this.router.use('/api/products', productRouter);
        this.router.use('/users', userRouter);
        this.router.use('/ticket', ticketRouter);
        this.router.use('/mockingproducts', mockingProductsRouter);
    }

    getRouter() {
        return this.router;
    }
}

