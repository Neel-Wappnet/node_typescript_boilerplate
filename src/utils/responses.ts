import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const responsePipe = (
    res: Response,
    statusCode: StatusCodes,
    status: boolean,
    message: string,
    data?: object | Array<object> | string,
): Response => {
    return res.status(statusCode).json({
        status,
        message,
        data,
    });
};
