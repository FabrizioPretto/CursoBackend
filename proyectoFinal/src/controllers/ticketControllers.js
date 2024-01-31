import Controllers from './classControllers.js';
import { createResponse } from '../utils/utils.js';
import ticketServices from '../services/ticketServices.js';
const services = new ticketServices();
import { HttpResponse, errorsDictionary } from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();

export default class TicketController extends Controllers {
    constructor() {
        super(services);
    }

    generateTicket = async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { cartId } = req.params;
            const ticket = await services.generateTicket(_id, cartId);
            if (!ticket) return httpResponse.ServerError(res, errorsDictionary.ERROR_GENERATE_TICKET); //res.status(404).json({ msg: "Error generate ticket" });
            else return httpResponse.Ok(res, ticket); //res.status(200).json(ticket);
        } catch (error) {
            next(error.message);
        }
    }

}