import nodemailer from 'nodemailer';
import dotenvConfig from "../config/dotenv.config.js";
import logger from '../config/winston.config.js';

let email = dotenvConfig.nodemail.NM_EMAIL;
let code = dotenvConfig.nodemail.NM_CODE;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: email,
        pass: code
    }
});


const mailOrderController =  async (req,res) => {
    try {
        let {message, cartId, userMail } = req.body;
        if (!message || !cartId || !userMail)
        return res
          .status(400)
          .send({ status: "error", error: "nonexistent product" }); 

        let messagePlus = `<br>
                            <p>Estimado Cliente, Gracias por su compra, su orden esta en proceso en breve nos contactaremos con usted para coordinar pago y entrega</p>
                            <br>
                            ${message}
                            <br>
                            Saludos Cordiales`
        let result = await transporter.sendMail({
            from: 'Ecommerce-Coderhouse',
            to: userMail,
            subject: `Orden de compra Nr ${cartId}`,
            html: messagePlus
        })
        res.status(200).json(result)
    } catch (error) {
        logger.log("error", `Error in mailController ${error} `);
        res.status(500).send({ error: error, message: "couldnt sendt mail" });
    }
}


const mailRegisterController =  (req,res,next) => {
    try {
        let text = `
        <h3>Usuario nuevo registrado</h3>
        <h4>Datos: </h4>
        <p><strong>Nombre completo: </strong>${req.user.name}</p>
        <p><strong>email: </strong>${req.user.email}</p>
        <p><strong>Dirección: </strong>${req.user.address}</p>
        <p><strong>Telefono Nro: </strong>${req.user.phoneNumber}</p>
        <p><strong>ID de carrito asociado: </strong>${req.user.cart}</p>
        <p><strong>Fecha y Hora del registro: </strong>${req.user.created_at}</p>
        `
         transporter.sendMail({
            from: 'Ecommerce-Coderhouse',
            to: email,
            subject: `Usuario Nuevo Registrado`,
            html: text
        })
        next();
    } catch (error) {
        logger.log("error", `Error in mailRegisterController ${error} `);
        res.status(500).send({ error: error, message: "couldnt sendt register mail" });
    }
}

export {
    mailOrderController,
    mailRegisterController
}


