import {Router} from 'express';
import path from 'path';
import { URL } from "url";
import Handlebars from "handlebars";
import sendEmail from "../utils/sendEmail.js";
import getEmailTemplate from "../utils/getTemplate.js"

const contactRouter = Router();

contactRouter.post('/', async (req, res) => {
    const data = req.body;
    try {
        const __dirname = new URL('.', import.meta.url).pathname;
        const templateSource = await getEmailTemplate(path.join(__dirname, '../templates/contact.template.hbs'));
        const template = Handlebars.compile(templateSource);
        const html = template({
            user: data.fullName,          
        });
        await sendEmail({
            to: [data.email],
            template: html,
            subject: "Confirmation de réception de votre demande de contact"
        });

        await sendEmail({
            to: ["contact@mldfa.com"],
            template: html,
            subject: "Confirmation de réception de votre demande de contact"
        });

        res.status(200).json({
            status: 200,
            message: "success"
        })
    }
    catch (error) 
    {
        res.status(400).json({
            status: 400,
            message: 'bad request'
        })
    }
});
export default contactRouter;
