import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', async (req: Request, res: Response) => {
    res.json({
        msg: 'server is up',
    });
});

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('server is running'));
