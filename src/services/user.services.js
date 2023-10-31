import UserModel from "../models/user.models.js";

const editUserService = async (userId, userData) => {
    const user = UserModel.findOneAndUpdate({
        _id: userId
    }, userData);
    try {
           await user.exec();
           return (user);
    } catch (error) {
        return (null);
    }
}

const getUserService = async (userId) => {
    try
    {
        const user = await UserModel.findOne({
            _id: userId
        }).populate('templates').exec();

        return (user);
    }
    catch (error)
    {
        console.log(error);
        return (null);
    }
} 

export {
    editUserService,
    getUserService
};
