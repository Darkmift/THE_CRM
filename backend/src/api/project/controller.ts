import { NextFunction, Request, Response } from 'express';
import {
    createProject,
    getProjectById,
    getProjectByName,
    getAllProjects,
    updateProject,
    deleteProject,
} from './services';

export const addProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await createProject(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const getProjectByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await getProjectById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getProjectByNameHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await getProjectByName(req.params.name);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getAllProjectsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await getAllProjects();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const editProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await updateProject(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const removeProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await deleteProject(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
