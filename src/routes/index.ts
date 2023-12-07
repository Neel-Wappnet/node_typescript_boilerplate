import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    throw new Error('Custom Error');
    return res.json({
        msg: 'server is up',
    });
});

export default router;
