import mongoose from "mongoose";


const newsletterSubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    isVerfied: {
        type: Boolean,
        default: false,
    }
});


const NewsletterSubscriberModel = mongoose.model('newsletterSubscriber', newsletterSubscriberSchema);

export default NewsletterSubscriberModel;
