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
            firstText: subscriberData.dinner ? "Votre demande a été enregistrée, et nous sommes ravis que vous ayez l'intention de participer à notre journée ainsi qu'au dîner gala. Veuillez noter que la participation au dîner gala est payante, et nous vous contacterons dans les prochains jours pour discuter des modalités de paiement et vous fournir plus de détails."
            : "Votre demande a été enregistrée. Nous sommes ravis que vous ayez l'intention de participer à notre événement. Dans les prochains jours, nous vous communiquerons le lieu et d'autres détails importants pour que vous puissiez planifier votre participation en toute facilité.",
            secondText: subscriberData.dinner ? "Nous avons hâte de vous accueillir à notre événement.":
            "Nous avons hâte de vous accueillir à notre événement.",
            subject: (subscriberData.dinner) ? "Confirmation votre participation et réservation pour le dîner Gala"
            : "Confirmation votre participation"
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
