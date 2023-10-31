import mongoose from "mongoose";


const sponsorSchema  = mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    phone: String,
    sponsorPack : {
        type: String,
        enum: ["connect", "smart", "lightning", "official"],
    },
    sponsorStatus: {
        type: String,
        enum: ["pending", "paid", "fail"],
        default: "pending"
    }
});


const SponsorModel =  mongoose.model("Sponsor", sponsorSchema);

export default SponsorModel;