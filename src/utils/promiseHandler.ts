import { NextFunction, Request, Response, RequestHandler } from 'express';

export const promiseHandler = <T extends RequestHandler>(fn: T): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
