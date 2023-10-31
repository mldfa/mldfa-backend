import {
    addNewSubscriberService
} from '../services/subscriber.services.js';


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
    addNewSubscriberController
}