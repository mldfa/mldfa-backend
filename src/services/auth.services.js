import bcrypt from 'bcrypt';
import UserModel from '../models/user.models.js';
import jwt from 'jsonwebtoken';

const loginService = async ({email, password}) => {
    
    try {
        const user = await UserModel.findOne({email}).exec();
        if (!user)
            return (null);
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword)
        {
            return {accessToken: jwt.sign({userId: user._id}, process.env.JWTSECRETKEY_TOKEN, {
                expiresIn: '15min'
            }),
            refreshToken: jwt.sign({userId: user._id}, process.env.JWTSECRETKEY_REFRESHTOKEN, {
                expiresIn: '1d'
            })
        }
        }
        return (null);
    }
    catch (error)
    {
        return (null);
    }
}

const registerService =  async   (userData) => {
    const password = await bcrypt.hash(userData.password, parseInt(process.env.BCRYPTROUNDS));
    const newUser = new UserModel({...userData, password, isVerified: false});
    try {
        await newUser.save();
        return {accessToken: jwt.sign({userId: newUser._id}, process.env.JWTSECRETKEY_TOKEN, {
                expiresIn: '15min'
            }),
            refreshToken: jwt.sign({userId: newUser._id}, process.env.JWTSECRETKEY_REFRESHTOKEN, {
                expiresIn: '1d'
            })
        }
    }
    catch (error)
    {
        return null;
    }
}

export {
    loginService,
    registerService
};