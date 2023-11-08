import {Router} from 'express';
import {
    addNewSponsorController,
    getSponsorExcelController
} from '../controllers/sponsor.controllers.js';

const sponsorRouter = Router();

sponsorRouter.post('/new', addNewSponsorController);
sponsorRouter.get('/excel', getSponsorExcelController);
export default sponsorRouter;
