// instructor.router.ts

import { Router } from 'express';
import Joi from 'Joi';
import { joiValidateMiddleware } from '@/api/common/middlwares/joi';
import {
    addInstructor,
    getInstructorById,
    getInstructorByName,
    getAllInstructors,
    editInstructor,
    removeInstructor,
} from './controller';

const router = Router();

const schemas = {
    create: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
    }),
    update: Joi.object({
        name: Joi.string(),
        image: Joi.string(),
        description: Joi.string(),
    }),
};

router.post('/', joiValidateMiddleware(schemas.create, 'body'), addInstructor);
router.get('/', getAllInstructors);
router.get('/:id', getInstructorById);
router.get('/name/:name', getInstructorByName);
router.put(
    '/:id',
    joiValidateMiddleware(schemas.update, 'body'),
    editInstructor,
);
router.delete('/:id', removeInstructor);

export default router;
