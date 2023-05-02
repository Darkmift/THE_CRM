import { NextFunction, Request, Response } from 'express';
import { createUser } from './services';

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
