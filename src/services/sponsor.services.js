import SponsorModel from "../models/sponsor.models.js";
import getEmailTemplate from "../utils/getTemplate.js"
import sendEmail from "../utils/sendEmail.js";
import path from 'path';
import { URL } from "url";
import Handlebars from "handlebars";

const   getAllSponsorsService = async () => {
    try {
        const allSponosrs= await SponsorModel.find().exec();
        return (allSponosrs);
    }
    catch (error)
    {
        return (null);
    }
}

const editSponsorService = async (sponsorData) => {
   
    const {_id, ...restData } = sponsorData;
    try {
        const updatedSponsor = await SponsorModel.findOneAndUpdate({
            _id
        }, restData).exec();
        return (updatedSponsor);
    }
    catch (error)
    {
        return (null);
    }
}

const addNewSponsorService = async (sponsorData) => {
    try
    {
        const __dirname = new URL('.', import.meta.url).pathname;
        const templateSource = await getEmailTemplate(path.join(__dirname, '../templates/sponsor.template.hbs'));
        const template = Handlebars.compile(templateSource);
        const html = template({
            user: sponsorData.fullName
        })

        sendEmail({
            to: [sponsorData.email],
            template: html,
            subject: "Réception de votre demande de sponsoring"
        });

        sendEmail({
            to: [process.env.SUPERUSER_EMAIL],
            template: html,
            subject: "Réception de votre demande de sponsoring"
        });
        // const newSponsor = new SponsorModel(sponsorData);
        // await newSponsor.save();
        return (false);
    }
    catch  (error)
    {
        console.log(error);
        return (null);
    }
}

export {
    getAllSponsorsService,
    editSponsorService,
    addNewSponsorService
};