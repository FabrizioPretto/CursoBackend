import 'dotenv/config'
import { welcomeTemplate } from '../services/welcomeTemplate.js'
import { transporter } from '../services/emailServices.js';

export const sendGmail = async (req, res) => {
    try {
        const { dest, name } = req.body;
        const gmailOptions = {
            from: process.env.EMAIL,
            to: dest,
            subject: 'Bienvenido/a',
            html: welcomeTemplate,
            attachments: [
                {
                    path: process.cwd() + '/src/services/text.txt',
                    filename: `Bienvenida ${name}`
                }
            ]
        }
        const response = await transporter.sendMail(gmailOptions);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}