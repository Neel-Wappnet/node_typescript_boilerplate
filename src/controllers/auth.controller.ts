import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
    INVALID_CREDENTIALS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    USER_ALREADY_EXIST,
    USER_REGISTERED,
    VALIDATION_FAILED,
} from '../helpers';
import { validationPipe, responsePipe, signJWT } from '../utils';
import { LoginDTO, UserRegisterDTO } from '../validators';
import { userService } from '../services';
import { promiseHandler } from '../utils/promiseHandler';
import { IJWTSign } from '../types';

export const register = promiseHandler(async (req: Request, res: Response) => {
    const payload: UserRegisterDTO = req.body;
    const { status, errors } = await validationPipe(UserRegisterDTO, payload);

    if (status) {
        return responsePipe(res, StatusCodes.BAD_REQUEST, false, VALIDATION_FAILED, errors);
    }

    const isExist = await userService.getUserByEmail(payload.email);

    if (isExist) {
        return responsePipe(res, StatusCodes.CONFLICT, false, USER_ALREADY_EXIST);
    }

    const data = await userService.createUser(payload);

    return responsePipe(res, StatusCodes.CREATED, true, USER_REGISTERED, data);
});

export const login = promiseHandler(async (req: Request, res: Response): Promise<Response> => {
    const payload: LoginDTO = req.body;
    const { status, errors } = await validationPipe(LoginDTO, payload);

    if (status) {
        return responsePipe(res, StatusCodes.BAD_REQUEST, false, VALIDATION_FAILED, errors);
    }

    const user = await userService.getUserByEmail(payload.email);

    if (user) {
        const checkPassword = await user.comparePasswords(payload.password);

        if (checkPassword) {
            const tokens = signJWT({
                _id: user._id,
                first_name: user.first_name,
                email: user.email,
            });

            await userService.updateUser(user._id, { ...user, refresh_token: tokens.refreshToken });

            return responsePipe(res, StatusCodes.OK, true, LOGIN_SUCCESS, tokens);
        }
    }

    return responsePipe(res, StatusCodes.BAD_REQUEST, false, INVALID_CREDENTIALS);
});

export const logout = async (req: Request, res: Response) => {
    const payload: IJWTSign = req['user'];

    const user = await userService.getUserById(payload._id);

    await user.deleteRefreshToken();

    return responsePipe(res, StatusCodes.OK, true, LOGOUT_SUCCESS);
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
