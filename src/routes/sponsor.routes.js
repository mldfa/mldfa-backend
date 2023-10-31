import {Router} from 'express';
import {
    addNewSponsorController,
} from '../controllers/sponsor.controllers.js';

const sponsorRouter = Router();

sponsorRouter.post('/new', addNewSponsorController);

export default sponsorRouter;
