import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import router from './routes';
import environment from './configs';
import ApiError from './utils/errors';

// Express Application
const app: Application = express();

// middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

// routes
app.use('/api', router);

// error handler
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json({
        name: err.name,
        statusCode: err.statusCode,
        message: err.message,
        stack: err.stack,
    });
    next();
});

// eslint-disable-next-line no-console
app.listen(environment.port, () => console.log(`server is running on ${environment.port}`));
