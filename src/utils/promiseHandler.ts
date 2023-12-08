import { NextFunction, Request, Response, RequestHandler } from 'express';

const promiseHandler =
    <T extends RequestHandler>(fn: T): RequestHandler =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

export default promiseHandler;
