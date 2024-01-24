import { TicketModel } from "./ticketModel.js";

export default class TicketMongoDao {
    async create(obj) {
        try {
            return await TicketModel.create(obj);
        } catch (error) {
            console.log(error);
        }
    }
}