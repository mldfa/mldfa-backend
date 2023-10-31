import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";

// OTHER
import getEmailTemplate from "./src/utils/getTemplate.js"
import sendEmail from "./src/utils/sendEmail.js";
import path from 'path';
import { URL } from "url";
import Handlebars from "handlebars";

//ROUTES

import sponsorRouter from "./src/routes/sponsor.routes.js";
import subscriberRouter from "./src/routes/subscribers.routes.js";
//APP
const app = express();

dotenv.config();

app.use(cors());
app.use(bodyparser.json());
app.use(cookieParser());

// Routers
app.use('/sponsors', sponsorRouter);
app.use('/subscribers', subscriberRouter);

app.post('/contact', async (req, res) => {
    const data = req.body;
    try {
        const __dirname = new URL('.', import.meta.url).pathname;
        const templateSource = await getEmailTemplate(path.join(__dirname, './src/templates/contact.template.hbs'));
        const template = Handlebars.compile(templateSource);
        const html = template({
            user: data.fullName,          
        });
    
        sendEmail({
            to: ["contact@mldfa.com"],
            template: html,
            subject: "Contact Noticifation Email"
        });
    
        sendEmail({
            to: [data.email],
            template: html,
            subject: "Contact Noticifation Email"
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
// RUN 
app.listen(process.env.PORT || 8000, () => {
    console.log(`APPLICATION IS LISTENING ON PORT: ${process.env.PORT || 8000}`);
});