import { Request, Response, NextFunction } from 'express';
import { logger } from '@/utils/logger';
import { QueryFailedError } from 'typeorm';

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    _: NextFunction,
) => {
    if (typeof err === 'string') {
        // custom application error
        logger.error('[ERROR-HANDLER] ' + err);
        return res.status(400).json({ succes: false, message: err });
    }

    if (err instanceof QueryFailedError) {
        let output;
        // Check for SQLite unique constraint error code
        if (err.driverError.errno === 19) {
            output = {
                reason: 'unique QueryFailedError',
                message: err.message,
            };
        } else {
            output = {
                reason: 'unknown QueryFailedError',
                message: err.message,
            };
        }
        logger.error('Query failed:', err);
        return res.status(400).json({
            succes: false,
            message: `${output.reason}->\n\n${output.message}`,
        });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        logger.error('[ERROR-HANDLER] ' + err.name);
        return res
            .status(401)
            .json({ succes: false, message: 'Invalid Token' });
    }

    // default to 500 server error
    logger.error('[ERROR-HANDLER] ' + err.message);
    return res.status(500).json({ succes: false, message: err.message });
};

export default errorHandler;
