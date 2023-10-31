import TemplateModel from "../models/template.models";
import UserModel from "../models/user.models";

const newTemplateService = async (userId, templateData) => {
    try {
        const template = new TemplateModel(templateData);
        const user = await UserModel.findOne({
            _id: userId
        });
        template.owner = user;
        user.templates.push(template);
        await user.save();
        await template.save();
        return (template)
    }
    catch  (error)
    {
        return (null);
    }
}


const allTemplatesService = async () => {
    try {
        const templates = TemplateModel.find().exec();
        return (templates);
    }
    catch(error)
    {
        return (null);
    }
}


export {
    newTemplateService,
    allTemplatesService
}