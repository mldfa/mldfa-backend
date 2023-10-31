import {Router} from "express";
import {getUserController, editUserController} from '../controllers/user.controllers.js'
import verifyJwt from "../middlewares/verifyAcesstoken.middleware.js";

const userRouter = Router();

userRouter.get('/:userId', verifyJwt,  getUserController);

userRouter.put('/edit/:userId', verifyJwt, editUserController);

export default userRouter;