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

export const sendMails = async (user, service, prod) => {
    try {
        const { first_name, last_name, email } = user;
        let person = first_name + " " + last_name;
        let message = "";
        let subj = "";

        switch (service) {
            case "inactiveUsers":
                message = `${person} le informamos que su cuenta ha sido eliminada por no registrarse ingresos en más de dos días`;
                subj = "Cuenta eliminada"
                break;
            case "premiumMail":
                message = `${person} le informamos que el producto "${prod}" ha sido eliminado por el administrador`;
                subj = "Producto eliminado"
                break;
            default:
                message = "";
                subj = "";
                break;
        };

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subj,
            html: message
        }

        const response = await transporter.sendMail(mailOptions);
        if (!response) return false

    } catch (error) {
        throw new Error(error.message);
    }
}



/*
export const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Bienvenido/a',
    text: 'Bienvenido/a a tu tienda'
    //html
}*/