import { NextFunction, Request, Response } from 'express';
import {
    createYear,
    getById,
    getAll,
    updateYear,
    deleteYear,
    getByYear,
} from './services';

export const addYear = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await createYear(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const getYearById = async (
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

export const getYearByYearNumber = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await getByYear(req.params.year);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getYears = async (
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

export const editYear = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        delete req.body.id;
        const result = await updateYear(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const removeYear = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await deleteYear(req.params.id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};
