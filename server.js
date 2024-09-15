import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";

// OTHER

import sponsorRouter from "./src/routes/sponsor.routes.js";
import subscriberRouter from "./src/routes/subscribers.routes.js";
import Connect from './src/config/mongodb.config.js'
import contactRouter from "./src/routes/contact.routes.js";

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