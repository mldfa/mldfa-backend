import { loginService, registerService } from "../services/auth.services.js";



const loginController = async (req, res) => {
    const {email, password} = req.body;
    const tokens = await loginService({
        email, password
    });
    if (!tokens)
    {
        res.status(401).json({
            error: 401,
            message: 'email or password is invalid'
        });
    }
    else
    {
        res.cookie("refresh-token", tokens.refreshToken, {
            httpOnly: true,
            sameSite: true,
        } ).header('Authorization', tokens.accessToken).json({
            message: 'success'
        })
    }
};

const registerController = async (req, res) => {
    const userData = req.body;
    const tokens = await registerService(userData);
    if (!tokens)
    {
        res.status(400).json({
            error: 400,
            message: 'Invalid User Registration Data'
        })
    }
    else
    {
        res.cookie('refesh-token', tokens.refreshToken, {
            httpOnly: true,
            sameSite: true
        }).header('Authorization', tokens.accessToken).json({
            message: 'success'
        });
    }
}


export {
    loginController,
    registerController
}