import {Router} from 'express';
import  {
    findAllSubscriberController,
    findNewslettersSubscriberController,
    addNewSubscriberController
} from '../controllers/subscribers.controllers.js';
import verifyJwt from '../middlewares/verifyAcesstoken.middleware.js';


const subscriberRouter = Router();

subscriberRouter.get('/', verifyJwt, findAllSubscriberController);
subscriberRouter.get('/subscribed', verifyJwt, findNewslettersSubscriberController);
subscriberRouter.post('/new', addNewSubscriberController);


export default subscriberRouter;
