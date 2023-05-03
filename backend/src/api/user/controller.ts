import { NextFunction, Request, Response } from 'express';
import {
    createUser,
    getById,
    getAll,
    getByEmail,
    updateUser,
    deleteUser,
} from './services';

export const addUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await createUser(req.body);
        res.status(201).json({ ...result, role: result.role.role });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (
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

export const getUsers = async (
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

export const getUserByEmail = async (
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

export const editUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await updateUser(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const removeUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await deleteUser(req.params.id);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};
