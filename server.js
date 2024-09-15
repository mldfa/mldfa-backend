import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";

// OTHER
import getEmailTemplate from "./src/utils/getTemplate.js"
import sendEmail from "./src/utils/sendEmail.js";
import sponsorRouter from "./src/routes/sponsor.routes.js";
import subscriberRouter from "./src/routes/subscribers.routes.js";
import Connect from './src/config/mongodb.config.js'
import path from 'path';
import { URL } from "url";
import Handlebars from "handlebars";
import contactRouter from "./src/routes/contact.routes.js";

// QUERIES

const createSponsorQuery = `
  CREATE TABLE IF NOT EXISTS sponsor (
    id SERIAL PRIMARY KEY,
    CompanyName VARCHAR(255),
    fullName VARCHAR(255),
    email VARCHAR(255),
    phonenumber VARCHAR(20),
    pack VARCHAR(50)
  );
`;

const createSuscriberQuery = `
 CREATE TABLE IF NOT EXISTS subscriber (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255),
    job VARCHAR(255),
    activiteArea VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    dinner BOOLEAN
  );
`;
//ROUTES


//APP

const app = express();

dotenv.config();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }));
app.use(bodyparser.json());
app.use(cookieParser());

// Routers
app.use('/sponsors', sponsorRouter);
app.use('/subscribers', subscriberRouter);

app.use('/send', contactRouter);
// RUN 
app.listen(process.env.PORT || 8000, async () => {
    console.log(`APPLICATION IS LISTENING ON PORT: ${process.env.PORT || 8000}`);
    Connect().then(()=>
    {
        console.log('Database got connected');
    }).catch(err =>{
        console.log('Something Went Wrong', err);
    });
});