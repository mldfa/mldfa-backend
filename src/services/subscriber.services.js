import Handlebars from "handlebars";
import getEmailTemplate from "../utils/getTemplate.js"
import sendEmail from "../utils/sendEmail.js";
import path from 'path';
import ExcelJS from 'exceljs';
import fs from 'fs';
import { URL } from "url";
import subscriberModel from "../models/subscriber.model.js";


const   addNewSubscriberService = async (subscriberData) =>  {
    try {
        const __dirname = new URL('.', import.meta.url).pathname;
        const templateSource = await getEmailTemplate(path.join(__dirname, '../templates/client.template.hbs'));
        const template = Handlebars.compile(templateSource);
        const html = template({
            user: subscriberData.fullName,
            subject: (subscriberData.dinner) ? "Confirmation de votre participation et réservation pour le dîner Gala"
            : "Confirmation votre participation",
            isDinner: subscriberData.dinner,
        })

        await sendEmail({
            to: [subscriberData.email],
            template: html,
            subject: (subscriberData.dinner) ? "Confirmation de votre participation et réservation pour le dîner Gala" 
            : "Confirmation de votre participation"
        });
        

        await sendEmail({
            to: [process.env.SUPERUSER_EMAIL],
            template: html,
            subject: (subscriberData.dinner) ? "Confirmation votre participation et réservation pour le dîner Gala" 
            : "Confirmation de votre participation"
        });
        const subsriber = new subscriberModel({...subscriberData});
        subsriber.save();
        return (true);
    }
    catch (error)
    {
        console.log(error);
        return (null);
    }
}

const getSubscriberExcelService = async (res) => {
    const data = await subscriberModel.find();
     const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');
    const headers = ["id", "Nom Complet", "Profession", "Secteur d’activité", "Email", "Téléphone", "Dinner", 'COCKTAIL'];
    worksheet.addRow(headers);
    data.forEach(row => {
        const values = [row._id, row.fullName, row.Job, row.ActivityArea, row.email, row.phone, row.dinner ? "OUI": "NO", row.cocktail ? "OUI": "NO"];
        worksheet.addRow(values);
    });
    const now = new Date(Date.now());
    const dt = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}-${now.getHours()}\:${now.getMinutes()}\:${now.getSeconds()}`;
    const excelFileName = `Subscriber_${dt}.xlsx`;
    const __dirname = new URL('.', import.meta.url).pathname;
    await workbook.xlsx.writeFile(excelFileName);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${excelFileName}"`);
    const p = path.join(__dirname, '../../' + excelFileName);
    const fileStream = fs.createReadStream(p);
    fileStream.pipe(res);
    fileStream.on('close', () => {
        fs.unlinkSync(excelFileName);
    });
}
export {
    addNewSubscriberService,
    getSubscriberExcelService
}
