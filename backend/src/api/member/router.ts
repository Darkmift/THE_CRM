import { Router } from 'express';
import Joi from 'Joi';
import { joiValidateMiddleware } from './../common/middlwares/joi';
import {
    addMember,
    getMemberById,
    getMemberByEmail,
    getMembers,
    editMember,
    removeMember,
} from './controller';

const router = Router();

const schemas = {
    create: Joi.object({
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    }),
    update: Joi.object({
        email: Joi.string().email(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        id: Joi.alternatives().try(Joi.number(), Joi.string()),
    }),
};

router.post('/', joiValidateMiddleware(schemas.create, 'body'), addMember);
router.get('/', getMembers);
router.get('/:id', getMemberById);
router.get('/email/:email', getMemberByEmail);
router.put('/:id', joiValidateMiddleware(schemas.update, 'body'), editMember);
router.delete('/:id', removeMember);

export default router;
