import mongoose from 'mongoose';

const subscriberSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
        }
        ,
        registrationDate: {
            type: Date,
            default: Date.now()
        },
        emailVerified: {
            type: Boolean,
            default: false
        },
        recieveNewsletters: {
            type: Boolean,
            default: false
        },
        dinner: {
            type: Boolean
        }
    }
);


const SubscriberModel = mongoose.model('Subscriber', subscriberSchema);

export default SubscriberModel;