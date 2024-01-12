import { Router } from "express";
//const router = Router();

import cartRouter from '../api/cartRouter.js';
import productRouter from '../api/productRouter.js';
import userRouter from '../api/userRouter.js';
import viewsRouter from '../api/viewsRouter.js';
import viewRealTimeProductRouter from '../api/viewRealTimeProductsRouter.js';


export default class MainRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.use('/api/carts', cartRouter);
        this.router.use('/api/products', productRouter);
        this.router.use('/users', userRouter);
        this.router.use('/', viewsRouter);
        this.router.use('/realtimeproducts', viewRealTimeProductRouter);
    }

    getRouter() {
        return this.router;
    }
}






//export default router;