import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { USER_REGISTERED } from '../helpers/messages';

export const register = async (req: Request, res: Response) => {
    const payload = req.body;

    res.status(StatusCodes.CREATED).json({
        status: true,
        data: payload,
        message: USER_REGISTERED,
    });
};

export const login = async (req: Request, res: Response) => {
    const payload = req.body;

    res.status(StatusCodes.CREATED).json({
        status: true,
        data: payload,
        message: USER_REGISTERED,
    });
};

export const logout = async (req: Request, res: Response) => {
    const payload = req.body;

    res.status(StatusCodes.CREATED).json({
        status: true,
        data: payload,
        message: USER_REGISTERED,
    });
};

export const forgotPassword = async (req: Request, res: Response) => {
    const payload = req.body;

    res.status(StatusCodes.CREATED).json({
        status: true,
        data: payload,
        message: USER_REGISTERED,
    });
};

export const resetPassword = async (req: Request, res: Response) => {
    const payload = req.body;

    res.status(StatusCodes.CREATED).json({
        status: true,
        data: payload,
        message: USER_REGISTERED,
    });
};
