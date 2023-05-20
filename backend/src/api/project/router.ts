import express from 'express';
import Joi from 'Joi';
import { joiValidateMiddleware } from '../common/middlwares/joi';
import {
    addProject,
    getProjectByIdHandler,
    getProjectByNameHandler,
    getAllProjectsHandler,
    editProject,
    removeProject,
} from './controller';

const schemas = {
    create: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
        year: Joi.string().regex(/^(200[0-9]|20[1-4][0-9]|2050)$/),
    }),
    update: Joi.object({
        name: Joi.string(),
        image: Joi.string(),
        description: Joi.string(),
        year: Joi.number().integer().min(2000).max(2050),
        // year: Joi.alternatives().try(
        //     Joi.number().integer().min(2000).max(2050),
        //     Joi.string().regex(/^(200[0-9]|20[1-4][0-9]|2050)$/),
        // ),
        id: Joi.alternatives().try(Joi.number(), Joi.string()),
    }),
};

const router = express.Router();

router.post('/', joiValidateMiddleware(schemas.create, 'body'), addProject);
router.get('/:id', getProjectByIdHandler);
router.get('/name/:name', getProjectByNameHandler);
router.get('/', getAllProjectsHandler);
router.put('/:id', joiValidateMiddleware(schemas.update, 'body'), editProject);
router.delete('/:id', removeProject);

export default router;
