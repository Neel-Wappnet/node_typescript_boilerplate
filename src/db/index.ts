import { connect } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { ApiError, logger } from '../utils';
import environment from '../configs';

async function connectDB() {
    try {
        const MONGO_URI = environment.dbURL;
        await connect(MONGO_URI);
        logger.info('db connection established');
    } catch (error) {
        new ApiError(StatusCodes.SERVICE_UNAVAILABLE, error.message, error.stack);
    }
}

export default connectDB;
