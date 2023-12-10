import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import router from './routes';
import environment from './configs';
import { ApiError, logger, responsePipe } from './utils';
import connectDB from './db';

// Express Application
const app: Application = express();

// middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());
app.use(compression());
app.use(express.static('public'));

// routes
app.use(router);

// error handler
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
    responsePipe(res, err.statusCode, false, err.message, err.stack);
    next();
});

app.listen(environment.port, async () => {
    await connectDB();
    logger.info(`server is running on ${environment.port}`);
});
