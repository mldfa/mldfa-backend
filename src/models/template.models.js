import mongoose from 'mongoose';


const templateSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['verify-email', 'subscriber-newsletter-email', 'sponsor-email', 'newsletter'],
        required: true
    },
    images: {
        type: [String]
    },
    html: {
        type: string
    },
    css: {
        type: string
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


const TemplateModel = mongoose.model('Template', templateSchema);

export default TemplateModel;