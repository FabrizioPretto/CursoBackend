import { Router } from "express";
//const router = Router();

import cartRouter from '../routes/cartRouter.js';
import productRouter from '../routes/productRouter.js';
import userRouter from '../routes/userRouter.js';
import viewsRouter from '../routes/viewsRouter.js';
import viewRealTimeProductRouter from '../routes/viewRealTimeProductsRouter.js';
import emailRouter from '../routes/emailRouter.js';
import smsRouter from '../routes/smsRouter.js';
import wsRouter from '../routes/wsRouter.js';
import ticketRouter from '../routes/ticketRouter.js';
import mockingProductsRouter from '../routes/mockingProductsRouter.js';

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
        this.router.use('/', emailRouter);
        this.router.use('/', smsRouter);
        this.router.use('/', wsRouter);
        this.router.use('/ticket', ticketRouter);
        this.router.use('/mockingproducts', mockingProductsRouter);
    }

    getRouter() {
        return this.router;
    }
}






//export default router;