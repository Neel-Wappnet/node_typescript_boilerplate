import { NextFunction, Request, Response } from 'express';
import { ApiError, verifyAccessJWT } from '../utils';
import { StatusCodes } from 'http-status-codes';

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (token) {
            const decoded = verifyAccessJWT(token);
            req['user'] = decoded;
            next();
        }
    } catch (error) {
        next(new ApiError(StatusCodes.UNAUTHORIZED, error.message));
    }
};
