import jwt from 'jsonwebtoken';



const verifyJwt = (req, res, next) => {
    const accessToken = req.headers['authorization'];
    const refreshToken = req.cookies['refresh-token'];

    if (!accessToken && !refreshToken)
    {
        return res.status(401).json({
            error: 401,
            message: 'access denied, No token provided!'
        });
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.JWTSECRETKEY_TOKEN);
        req.userId = decoded.userId;
        next();
    }
    catch (error)
    {
        if (!refreshToken)
        {
            res.status(401).json({
                error: 401,
                message: 'access denied, No refresh token provided!'
            })
        }
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWTSECRETKEY_REFRESHTOKEN);
            const accessToken = jwt.sign({user: decoded.user}, process.env.JWTSECRETKEY_TOKEN, {
                expiresIn: '15min'
            });
            res.cookie('refresh-token', refreshToken, {httpOnly: true, sameSite:'strict'}).header(
                'Authorization', accessToken
            ).json({
                userId: decoded.userId
            })
        }
        catch (error)
        {
            res.json(400).json({
                error: 400,
                message: 'Invalid Token!'
            })
        }
    }
}

export default verifyJwt;