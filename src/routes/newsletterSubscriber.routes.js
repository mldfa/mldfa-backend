import {Router} from 'express';
import {
    addNewNewsletterSubscriberController,
    getAllNewsletterSubscriberController
} from '../controllers/newsletterSubscriber.conrollers.js';
import verifyJwt from '../middlewares/verifyAcesstoken.middleware.js';


const newsletterSubscriberRouter = Router();

newsletterSubscriberRouter.post('/new', addNewNewsletterSubscriberController);
newsletterSubscriberRouter.get('/', verifyJwt, getAllNewsletterSubscriberController);

export default newsletterSubscriberRouter;
