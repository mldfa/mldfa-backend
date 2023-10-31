import NewsletterSubscriberModel from "../models/newsletterSubscriber.models.js";

const addNewNewsletterSubscriberService = async (subscriberData) => {

    try {
        const subscriber = new NewsletterSubscriberModel(subscriberData);
        await subscriber.save();
        return (subscriber);
    }
    catch (error)
    {
        return (null);
    }
}

const getAllNewsletterSubscriberService = async () => {
    try  {
        const subscribers = await NewsletterSubscriberModel.find().exec();
        return (subscribers);
    }
    catch (error)
    {
        return (null);
    }
}


export {
    addNewNewsletterSubscriberService,
    getAllNewsletterSubscriberService
}