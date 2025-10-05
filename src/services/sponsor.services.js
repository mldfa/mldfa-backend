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
    const sponsorExist = await sponsorModel.exists({
      email: sponsorData.email,
    });
    if (sponsorExist) return null;
    const sponsorDataBody = {
      companyName: sponsorData.organization,
      fullName: sponsorData.fullName,
      email: sponsorData.email,
      phone: sponsorData.phone,
      pack: sponsorData.pkg,
      message: sponsorData.message,
      roundTable: sponsorData.roundTable,
      studyCase: sponsorData.studyCase,
      totemSize: sponsorData.totemSize,
      total: sponsorData.total,
      vipExtra: sponsorData.vipExtra,
    };
    const subject = `Réception de votre demande de sponsoring / Sponsorship Request Received`;
    const template = Handlebars.compile(templateSource);
    const html = template(sponsorDataBody);
    console.log("!!1");
    await sendEmail({
      to: [sponsorData.email],
      template: html,
      subject,
    });
    console.log("!!2");
    await sendEmail({
      to: [process.env.SUPERUSER_EMAIL],
      template: html,
      subject,
    });
    const sponsor = new sponsorModel(sponsorDataBody);
    await sponsor.save();
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
    "Message",
    "Table ronde",
    "Study case",
    "Size totem",
    "total",
    "Pass VIP",
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
      row.message,
      row.roundTable,
      row.studyCase,
      row.totemSize,
      row.total,
      row.vipExtra,
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
