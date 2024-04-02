import { twilioClient } from "../../services/others/wsServices.js";
import 'dotenv/config';

export const sendWS = async (req, res) => {
    try {
        const msg = {
            body: req.body.message,
            from: process.env.CEL,
            to: req.body.dest,
            mediaUrl: ['https://www.um.es/documents/1083928/17665461/pruebas-evaluacion-10.png/2c4f951a-49fd-4230-ae8f-e95055d25bae?t=1589364888059']
        }
        const response = await twilioClient.messages.create(msg);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}