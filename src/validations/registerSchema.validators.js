import joi from 'joi';


const registerSchema = joi.object({
    name: joi.string().min(6).required(),
    email: joi.email().required(),
    password: joi.string().min(6).max(20).label('password').required(),
    repeatPassword: joi.string().valid(joi.ref('password')).required()
});

export default registerSchema;