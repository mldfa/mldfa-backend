import {Router} from 'express';
import {
    addNewSponsorController,
    getAllSponsorsController,
    editSponsorController
} from '../controllers/sponsor.controllers.js';
import verifyJwt from '../middlewares/verifyAcesstoken.middleware.js';

const sponsorRouter = Router();


sponsorRouter.get('/', verifyJwt, getAllSponsorsController);
sponsorRouter.post('/new', addNewSponsorController);
sponsorRouter.put('/edit', verifyJwt,  editSponsorController);

export default sponsorRouter;
