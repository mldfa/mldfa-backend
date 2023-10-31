import {Router} from 'express';
import { loginController,  registerController } from '../controllers/auth.controllers.js';

const authRouter = Router();

authRouter.post('/login', loginController);

authRouter.post('/register',  registerController);

authRouter.post('/logout', (req, res) => {
    res.json({
        message: 'logout'
    })
});


export default authRouter;