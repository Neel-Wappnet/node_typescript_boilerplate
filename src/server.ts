import express, { Application } from 'express';
import morgan from 'morgan';
import router from './routes';
import environment from './configs';

// Express Application
const app: Application = express();

// middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

// routes
app.use('/api', router);

// eslint-disable-next-line no-console
app.listen(environment.port, () => console.log(`server is running on ${environment.port}`));
