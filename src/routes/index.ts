import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../utils';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({
            msg: 'server is up',
        });
    } catch (err) {
        next(err);
    }
});

router.all('*', async (req, res, next) => {
    next(new ApiError(StatusCodes.NOT_FOUND, `${req.originalUrl} Not found`));
});

export default router;
