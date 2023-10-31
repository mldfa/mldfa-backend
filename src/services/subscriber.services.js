import Handlebars from "handlebars";
import getEmailTemplate from "../utils/getTemplate.js"
import sendEmail from "../utils/sendEmail.js";
import path from 'path';
import { URL } from "url";




const   addNewSubscriberService = async (subscriberData) =>  {
    try {
        const __dirname = new URL('.', import.meta.url).pathname;
        const templateSource = await getEmailTemplate(path.join(__dirname, '../templates/client.template.hbs'));
        const template = Handlebars.compile(templateSource);
        const html = template({
            user: subscriberData.fullName,
            subject: (subscriberData.dinner) ? "Confirmation votre participation et réservation pour le dîner Gala"
            : "Confirmation votre participation",
            isDinner: subscriberData.dinner,
        })

        await sendEmail({
            to: [subscriberData.email],
            template: html,
            subject: (subscriberData.dinner) ? "Confirmation votre participation et réservation pour le dîner Gala" 
            : "Confirmation votre participation"
        });
        

        await sendEmail({
            to: [process.env.SUPERUSER_EMAIL],
            template: html,
            subject: (subscriberData.dinner) ? "Confirmation votre participation et réservation pour le dîner Gala" 
            : "Confirmation votre participation"
        });
       // const newSubscriber = new SubscriberModel(subscriberData);
        // await newSubscriber.save();
        const  newSubscriber = true;
        return (newSubscriber);
    }
    catch (error)
    {
        console.log(error);
        return (null);
    }
}

export {
    addNewSubscriberService
}
