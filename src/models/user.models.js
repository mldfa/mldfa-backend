import mongoose, { Schema } from "mongoose";

const  userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    templates: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Template'
    }
})


const UserModel  = mongoose.model("User", userSchema);

export default UserModel;