import { Schema, model } from "mongoose";

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

const SponsorSchema = new Schema({
  companyName: {
    type: String,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
  },
  pack: {
    type: String,
  },
  message: {
    type: String,
  },
  roundTable: {
    type: Boolean,
  },
  studyCase: {
    type: Boolean,
  },
  totemSize: {
    type: String,
  },
  total: {
    type: Number,
  },
  vipExtra: {
    type: Number,
    default: 0,
  },
});

export default model("Sponsor", SponsorSchema);
