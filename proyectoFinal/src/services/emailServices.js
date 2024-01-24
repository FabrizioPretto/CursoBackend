import { createTransport } from 'nodemailer';
import 'dotenv/config';

export const transporter = createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


/*
export const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Bienvenido/a',
    text: 'Bienvenido/a a tu tienda'
    //html
}*/