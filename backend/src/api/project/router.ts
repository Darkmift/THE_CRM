import express from 'express';
import {
    addProject,
    getProjectByIdHandler,
    getProjectByNameHandler,
    getAllProjectsHandler,
    editProject,
    removeProject,
} from './controller';

const router = express.Router();

router.post('/', addProject);
router.get('/:id', getProjectByIdHandler);
router.get('/name/:name', getProjectByNameHandler);
router.get('/', getAllProjectsHandler);
router.put('/:id', editProject);
router.delete('/:id', removeProject);

export default router;
