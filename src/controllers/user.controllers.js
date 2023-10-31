import  {editUserService, getUserService} from '../services/user.services.js';


const getUserController = async (req, res) => {
    const user = await getUserService(req.params.userId);
    
    if (!user)
    {
        res.status(400).json({
            error: 400,
            message: 'Invalid User Data'
        })
    }
    else
    {
        const {password, ...rest} = JSON.parse(JSON.stringify(user));
        res.json(rest);
    }
}


const editUserController = async (req, res) => {
    const editedUser = await editUserService(req.params, req.body);
    if (!editedUser)
    {
        res.status(400).json({
            error: 400,
            message: 'Inavlid User Data or User'
        })
    }
    else {
        res.json(editedUser)
    }
}


export {
    getUserController,
    editUserController
}