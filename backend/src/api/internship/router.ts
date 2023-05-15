import { Router } from 'express';
import Joi from 'Joi';
import { joiValidateMiddleware } from './../common/middlwares/joi';
import {
    addInternship,
    getInternshipById,
    getInternshipByName,
    getAllInternships,
    editInternship,
    removeInternship,
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

router.post('/', joiValidateMiddleware(schemas.create, 'body'), addInternship);
router.get('/', getAllInternships);
router.get('/:id', getInternshipById);
router.get('/name/:name', getInternshipByName);
router.put(
    '/:id',
    joiValidateMiddleware(schemas.update, 'body'),
    editInternship,
);
router.delete('/:id', removeInternship);

export default router;
