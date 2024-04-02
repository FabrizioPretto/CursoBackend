import Controllers from '../classControllers.js';
import ticketServices from '../../services/ticket/ticketServices.js';
const services = new ticketServices();
import { HttpResponse, errorsDictionary } from "../../utils/httpResponse.js";
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
            if (!ticket) return httpResponse.ServerError(res, errorsDictionary.ERROR_GENERATE_TICKET);
            else return httpResponse.Ok(res, ticket);
        } catch (error) {
            next(error.message);
        }
    }

}