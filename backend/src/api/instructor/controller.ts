// instructor.controller.ts

import { NextFunction, Request, Response } from 'express';
import {
    create,
    getById,
    getByName,
    getAll,
    update,
    deleteInstructor,
} from './services';

export const addInstructor = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await create(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const getInstructorById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await getById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getInstructorByName = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await getByName(req.params.name);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getAllInstructors = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await getAll();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const editInstructor = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        delete req.body.id;
        const result = await update(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const removeInstructor = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await deleteInstructor(req.params.id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};
