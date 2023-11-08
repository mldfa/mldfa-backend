import {Router} from 'express';
import  {
    addNewSubscriberController,
    getSubscriberExcelController
} from '../controllers/subscribers.controllers.js';

const subscriberRouter = Router();
subscriberRouter.post('/new', addNewSubscriberController);
subscriberRouter.get('/excel', getSubscriberExcelController);

export default subscriberRouter;
