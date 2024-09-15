import { Schema, model } from "mongoose";


const SubscriberSchema = new Schema({
  fullName: {
    type: String
  },
  Job: {
    type: String
  },
  ActivityArea: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String
  },
  dinner: {
    type: Boolean
  },
  cocktail: {
    type: Boolean
  }
})


export default model('Subscriber', SubscriberSchema);