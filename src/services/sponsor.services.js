import getEmailTemplate from "../utils/getTemplate.js";
import sendEmail from "../utils/sendEmail.js";
import path from "path";
import { URL } from "url";
import fs from "fs";
import Handlebars from "handlebars";
import ExcelJS from "exceljs";
import sponsorModel from "../models/sponsor.model.js";

const addNewSponsorService = async (sponsorData) => {
  try {
    const __dirname = new URL(".", import.meta.url).pathname;
    const templateSource = await getEmailTemplate(
      path.join(__dirname, "../templates/sponsor.template.hbs")
    );
    const template = Handlebars.compile(templateSource);
    const html = template({
      user: sponsorData.fullName,
      pack: sponsorData.pack,
    });
    const sponsorExist = await sponsorModel.exists({
      email: sponsorData.email,
    });
    if (sponsorExist) return null;
    await sendEmail({
      to: [sponsorData.email],
      template: html,
      subject: `Réception de votre demande de sponsoring: Pack "${sponsorData.pack}"`,
    });

    await sendEmail({
      to: [process.env.SUPERUSER_EMAIL],
      template: html,
      subject: `Réception de votre demande de sponsoring: Pack "${sponsorData.pack}"`,
    });
    const sponsor = new sponsorModel({ ...sponsorData });
    sponsor.save();
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getSponsorExcelService = async (res) => {
  const data = await sponsorModel.find();
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");
  const headers = [
    "id",
    "Nom De L'entreprise",
    "Nom Complet",
    "Email",
    "Téléphone",
    "Pack",
  ];
  worksheet.addRow(headers);
  data.forEach((row) => {
    const values = [
      row._id,
      row.companyName,
      row.fullName,
      row.email,
      row.phone,
      row.pack,
    ];
    worksheet.addRow(values);
  });
  const now = new Date(Date.now());
  const dt = `${now.getDate()}-${
    now.getMonth() + 1
  }-${now.getFullYear()}-${now.getHours()}\:${now.getMinutes()}\:${now.getSeconds()}`;
  const excelFileName = `Sponsor_${dt}.xlsx`;
  const __dirname = new URL(".", import.meta.url).pathname;
  await workbook.xlsx.writeFile(excelFileName);
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${excelFileName}"`
  );
  const p = path.join(__dirname, "../../" + excelFileName);
  const fileStream = fs.createReadStream(p);
  fileStream.pipe(res);
  fileStream.on("close", () => {
    fs.unlinkSync(excelFileName);
  });
};
export { addNewSponsorService, getSponsorExcelService };
