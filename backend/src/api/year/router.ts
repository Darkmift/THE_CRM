import { Router } from 'express';
import Joi from 'Joi';
import { joiValidateMiddleware } from './../common/middlwares/joi';
import {
    addYear,
    getYearById,
    getYears,
    editYear,
    removeYear,
    getYearByYearNumber,
} from './controller';

const router = Router();

const schemas = {
    create: Joi.object({
        year: Joi.string().required(),
        isEnabled: Joi.boolean(),
    }),
    update: Joi.object({
        year: Joi.string().required(),
        isEnabled: Joi.boolean(),
        id: Joi.alternatives().try(Joi.number(), Joi.string()),
    }),
};

router.post('/', joiValidateMiddleware(schemas.create, 'body'), addYear);
router.get('/', getYears);
router.get('/:id', getYearById);
router.get('/year/:year', getYearByYearNumber);
router.put('/:id', joiValidateMiddleware(schemas.update, 'body'), editYear);
router.delete('/:id', removeYear);

export default router;
