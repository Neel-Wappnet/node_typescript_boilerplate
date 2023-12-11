import { NextFunction, Request, Response } from 'express';
import { ApiError, verifyAccessJWT } from '../utils';
import { StatusCodes } from 'http-status-codes';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if (token) {
            const decoded = verifyAccessJWT(token);
            // TODO: verify decoded
            req['user'] = decoded;
            next();
        }
    } catch (error) {
        next(new ApiError(StatusCodes.UNAUTHORIZED, error.message));
    }
};
