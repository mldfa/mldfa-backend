import Handlebars from "handlebars";
import getEmailTemplate from "../utils/getTemplate.js";
import sendEmail from "../utils/sendEmail.js";
import path from "path";
import ExcelJS from "exceljs";
import fs from "fs";
import { URL } from "url";
import subscriberModel from "../models/subscriber.model.js";

const addNewSubscriberService = async (subscriberData) => {
  const subjects = [
    "Confirmation de votre participation et réservation pour le Gala Prestige et le Cocktail Networking",
    "Confirmation de votre participation et réservation pour le Gala Prestige",
    "Confirmation de votre participation et réservation pour le Cocktail Networking",
    "Confirmation votre participation",
  ];
  let subject = "";
  if (subscriberData.dinner && subscriberData.cocktail) subject = subjects[0];
  else if (subscriberData.dinner) subject = subjects[1];
  else if (subscriberData.cocktail) subject = subjects[2];
  else subject = subjects[3];

  try {
    const __dirname = new URL(".", import.meta.url).pathname;
    const templateSource = await getEmailTemplate(
      path.join(__dirname, "../templates/client.template.hbs")
    );
    const template = Handlebars.compile(templateSource);
    const html = template({
      user: subscriberData.fullName,
      subject,
      isDinner: subscriberData.dinner,
      isBoth: subscriberData.dinner && subscriberData.cocktail,
      isCocktail: subscriberData.cocktail,
    });
    const subscriberExists = await subscriberModel.exists({
      email: subscriberData.email,
    });
    if (subscriberExists) return undefined;

    await sendEmail({
      to: [subscriberData.email],
      template: html,
      subject,
    });

    await sendEmail({
      to: [process.env.SUPERUSER_EMAIL],
      template: html,
      subject,
    });

    const subsriber = new subscriberModel({ ...subscriberData });
    subsriber.save();
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getSubscriberExcelService = async (res) => {
  const data = await subscriberModel.find();
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");
  const headers = [
    "id",
    "Nom Complet",
    "Profession",
    "Secteur d’activité",
    "Email",
    "Téléphone",
    "Dinner",
    "COCKTAIL",
  ];
  worksheet.addRow(headers);
  data.forEach((row) => {
    const values = [
      row._id,
      row.fullName,
      row.Job,
      row.ActivityArea,
      row.email,
      row.phone,
      row.dinner ? "OUI" : "NO",
      row.cocktail ? "OUI" : "NO",
    ];
    worksheet.addRow(values);
  });
  const now = new Date(Date.now());
  const dt = `${now.getDate()}-${
    now.getMonth() + 1
  }-${now.getFullYear()}-${now.getHours()}\:${now.getMinutes()}\:${now.getSeconds()}`;
  const excelFileName = `Subscriber_${dt}.xlsx`;
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
export { addNewSubscriberService, getSubscriberExcelService };
