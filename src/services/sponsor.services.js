import getEmailTemplate from "../utils/getTemplate.js"
import sendEmail from "../utils/sendEmail.js";
import path from 'path';
import { URL } from "url";
import Handlebars from "handlebars";

const addNewSponsorService = async (sponsorData) => {
    try
    {
        const __dirname = new URL('.', import.meta.url).pathname;
        const templateSource = await getEmailTemplate(path.join(__dirname, '../templates/sponsor.template.hbs'));
        const template = Handlebars.compile(templateSource);
        const html = template({
            user: sponsorData.fullName,
            pack: sponsorData.pack
        })
        await sendEmail({
            to: [sponsorData.email],
            template: html,
            subject: `Réception de votre demande de sponsoring: Pack "${sponsorData.pack}"`
        });

        await sendEmail({
            to: [process.env.SUPERUSER_EMAIL],
            template: html,
            subject: `Réception de votre demande de sponsoring: Pack "${sponsorData.pack}"`
        });
        return (true);
    }
    catch  (error)
    {
        console.log(error);
        return (null);
    }
}

export {
    addNewSponsorService
};