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
};

router.post('/', joiValidateMiddleware(schemas.create, 'body'), addYear);
router.get('/', getYears);
router.get('/:id', getYearById);
router.get('/year/:year', getYearByYearNumber);
router.put('/:id', joiValidateMiddleware(schemas.create, 'body'), editYear);
router.delete('/:id', removeYear);

export default router;
