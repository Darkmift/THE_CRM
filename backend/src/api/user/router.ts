import { joiValidateMiddleware } from './../common/middlwares/joi';
import { Router } from 'express';
import Joi from 'Joi';
import { ROLES } from '@/config/const';
import {
    addUser,
    getUserById,
    getUsers,
    getUserByEmail,
    editUser,
    removeUser,
} from './controller';

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
    update: Joi.object({
        firstName: Joi.string().min(1).max(255),
        lastName: Joi.string().min(1).max(255),
        email: Joi.string().email().max(255),
        role: Joi.string().valid(...Object.values(ROLES)),
        password: Joi.string().min(8).max(255),
        id: Joi.alternatives().try(Joi.number(), Joi.string()),
    }),
};

router.post('/', joiValidateMiddleware(schemas.create, 'body'), addUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/email/:email', getUserByEmail);
router.put('/:id', editUser);
router.delete('/:id', removeUser);

export default router;
