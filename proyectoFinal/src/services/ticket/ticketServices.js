import Services from '../classServices.js';
import factory from '../../persistence/daos/factory.js';
const { userDao, prodDao, cartDao, ticketDao } = factory;

import { v4 as uuidv4 } from 'uuid';

export default class TicketService extends Services {
    constructor() {
        super(ticketDao);
    };

    async generateTicket(_id, cartId) {
        try {

            const user = await userDao.getUserById(_id);
            if (!user) return false;

            const cart = await cartDao.getById(cartId);
            if (!cart) return false;

            let amountAcc = 0;

            for (const p of cart.products) {
                const idProd = p.product._id.toString();
                const prodFromDB = await prodDao.getProductById(idProd);

                if (p.quantity <= prodFromDB.stock) {
                    const amount = p.quantity * prodFromDB.price;
                    amountAcc += amount;
                }
            }

            const ticket = await ticketDao.createTicket({
                code: uuidv4(),
                purchase_datetime: new Date().toLocaleString(),
                amount: amountAcc,
                purchaser: user.email
            });

            cart.products = [];
            cart.save();

            return ticket;
        } catch (error) {
            throw new Error(error);
        }
    }
}