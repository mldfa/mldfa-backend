import {Router} from 'express';
import  {
    addNewSubscriberController
} from '../controllers/subscribers.controllers.js';

const subscriberRouter = Router();
subscriberRouter.post('/new', addNewSubscriberController);


export default subscriberRouter;
