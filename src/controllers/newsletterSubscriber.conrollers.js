import { addNewNewsletterSubscriberService, getAllNewsletterSubscriberService } from "../services/newletterSubscriber.services.js";



const addNewNewsletterSubscriberController = async (req, res) => {
    const subscriber = await addNewNewsletterSubscriberService(req.body);
    if (!subscriber)
    {
        res.status(400).json({
            error: 400,
            message: 'Invalid subscriber to newsletter data'
        })
    }
    else
    {
        res.json(subscriber);
    }
}


const getAllNewsletterSubscriberController = async (req, res) => {
    const subscribers = await getAllNewsletterSubscriberService();
    if (!subscribers)
    {
        res.status(500).json({
            error: 500,
            message: 'something went wrong, please try again later'
        })
    }
    else 
    {
        res.json(subscribers);
    }
}


export {
    addNewNewsletterSubscriberController,
    getAllNewsletterSubscriberController
}