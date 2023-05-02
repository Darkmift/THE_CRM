import { joiValidateMiddleware } from './../common/middlwares/joi';
import { Router } from 'express';
import Joi from 'Joi';
import { ROLES } from '@/config/const';
import { addUser } from './controller';
const router = Router();

const schemas = {
    create: Joi.object({
        firstName: Joi.string().min(1).max(255).required(),
        lastName: Joi.string().min(1).max(255).required(),
        email: Joi.string().email().max(255).required(),
        role: Joi.string()
            .valid(...Object.values(ROLES))
            .required(),
        password: Joi.string().min(8).max(255).required(),
        confirmPassword: Joi.string()
            .min(8)
            .max(255)
            .optional()
            .when('password', {
                is: Joi.exist(),
                then: Joi.ref('password'),
                otherwise: Joi.optional(),
            }),
    }),
};

router.post('/', joiValidateMiddleware(schemas.create, 'body'), addUser);

export default router;
