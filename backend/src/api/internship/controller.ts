import { NextFunction, Request, Response } from 'express';
import {
    create,
    getById,
    getByName,
    getAll,
    update,
    deleteInternship,
} from './services';

export const addInternship = async (
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

export const getInternshipById = async (
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

export const getInternshipByName = async (
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

export const getAllInternships = async (
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

export const editInternship = async (
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

export const removeInternship = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await deleteInternship(req.params.id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};
