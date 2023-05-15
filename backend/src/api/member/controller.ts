import { NextFunction, Request, Response } from 'express';
import {
    createMember,
    getById,
    getAll,
    updateMember,
    deleteMember,
    getByEmail,
} from './services';

export const addMember = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await createMember(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const getMemberById = async (
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

export const getMemberByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await getByEmail(req.params.email);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getMembers = async (
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

export const editMember = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        delete req.body.id;
        const result = await updateMember(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const removeMember = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await deleteMember(req.params.id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};
