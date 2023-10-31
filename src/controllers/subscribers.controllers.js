import {
    findAllSubscriberService,
    findNewslettersSubscriberService,
    addNewSubscriberService
} from '../services/subscriber.services.js';

const findAllSubscriberController = async (req, res) => {
    const allSubscribers = await findAllSubscriberService();

    if (!allSubscribers)
    {
        res.status(500).json({
            error: 500,
            message: 'Unable To Retrieve All Subscribers, try again in a while'
        })
    }
    else {
        res.json(allSubscribers);
    }
}

const findNewslettersSubscriberController = async (req, res) => {
    const newLettersSubscriber = await findNewslettersSubscriberService();
    if (!newLettersSubscriber)
    {
        res.status(500).json({
         error: 500,
         message: 'Unable To Retrieve new letters Subscriber, try again in a moment'   
        });
    }
    else
        res.json(newLettersSubscriber);
}

const addNewSubscriberController= async (req, res) => {
    const newSubscriber = await addNewSubscriberService(req.body);
    if (!newSubscriber)
    {
        res.status(400).json({
            error: 400,
            message: 'Invalid Data for Subscriber'
        })
    }
    else
        res.json(newSubscriber);
}

export {
    findAllSubscriberController,
    findNewslettersSubscriberController,
    addNewSubscriberController
}