import TicketMongoDao from "../persistence/daos/mongodb/tickets/ticketDao.js";
const ticketDao = new TicketMongoDao();
import ProductService from "./productServices.js";
const prodServices = new ProductService();
import UserServices from "./userServices.js";
const userServices = new UserServices();

import { getById } from "./cartServices.js";
//import { getUserById } from "./userServices.js";
//import { getProductById as getProdById } from "./productServices.js";


import { v4 as uuidv4 } from 'uuid';

export const generateTicket = async (userId, cartId) => {
    try {
        //buscar el usuario
        const user = await userServices.getUserById(userId);
        if (!user) return false;
        //buscar el carrito
        const cart = await getById(cartId);
        if (!cart) return false;

        let amountAcc = 0;

        for (const p of cart.products) {
            const idProd = p.product._id.toString();
            const prodFromDB = await prodServices.getProductById(idProd);
            //verifico si la cantidad del carrito supera al stock del producto en db
            if (p.quantity <= prodFromDB.stock) {
                const amount = p.quantity * prodFromDB.price;
                amountAcc += amount;
            }
        }
        //crear el ticket
        const ticket = await ticketDao.create({
            code: uuidv4(),
            purchase_datetime: new Date().toLocaleString(),
            amount: amountAcc,
            purchaser: user.email
        });

        //vaciar el carrito
        cart.products = [];
        cart.save();

        //retornar el ticket
        return ticket;
    } catch (error) {
        console.log(error);
    }
}