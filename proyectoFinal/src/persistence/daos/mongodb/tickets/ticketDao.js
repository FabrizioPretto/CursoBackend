import MongoDao from "../mongoDao.js";
import { TicketModel } from "./ticketModel.js";

export default class TicketMongoDao extends MongoDao {

    constructor() {
        super(TicketModel);
    };

    async createTicket(obj) {
        try {
            return await TicketModel.create(obj);
        } catch (error) {
            console.log(error);
        }
    }
}



