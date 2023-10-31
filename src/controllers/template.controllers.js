import { allTemplatesService, newTemplateService } from "../services/template.services.js";


const newTemplateController = async (req, res) => {
    const template = await newTemplateService(req.userId, req.body);
    if (!template)
    {
        res.status(400).json({
            error: 400,
            message: 'Invalid User Id Or invalid template data'
        });
    }
    else
    {
        res.json(template);
    }
}


const allTemplatesController = async (req, res) => {
    const templates = await allTemplatesService();
    if (!templates)
    {
        res.status(500).json({
            error: 500,
            message: 'Something went wrong, try again later'
        });
    }
    else
    {
        res.json(templates);
    }
}

export {
    allTemplatesController,
    newTemplateController
}