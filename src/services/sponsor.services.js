import getEmailTemplate from "../utils/getTemplate.js"
import sendEmail from "../utils/sendEmail.js";
import path from 'path';
import { URL } from "url";
import fs from 'fs';
import Handlebars from "handlebars";
import ExcelJS from 'exceljs';
import client from "../config/client.config.js";

const insertSponsorQuery = `
  INSERT INTO sponsor (CompanyName, fullName, email, phonenumber, pack)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id;
`;

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

        await  client.query(insertSponsorQuery, [
            sponsorData.companyName,
            sponsorData.fullName,
            sponsorData.email,
            sponsorData.phone,
            sponsorData.pack,
        ]);
        return (true);
    }
    catch  (error)
    {
        console.log(error);
        return (null);
    }
}

const getSponsorExcelService = async (res) => {
    const data = await client.query("select * from sponsor;");
    console.log(data.rows);
     const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');
    const headers = ["id", "Nom De L'entreprise", "Nom Complet", "Email", "Téléphone", "Pack"];
    worksheet.addRow(headers);
    data.rows.forEach(row => {
        const values = Object.values(row);
        console.log(values);
         worksheet.addRow(values);
    });
    const now = new Date(Date.now());
    const dt = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}-${now.getHours()}\:${now.getMinutes()}\:${now.getSeconds()}`;
    const excelFileName = `Sponsor_${dt}.xlsx`;
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
    addNewSponsorService,
    getSponsorExcelService
};