/* eslint-disable no-undef */
import { config } from 'dotenv';
import { env } from 'process';
config();

const environment = {
    port: env.PORT as unknown as number,
    dbURL: env.DB_URL as string,
    atSecret: env.JWT_ACCESS_TOKEN_SECRET as string,
    rtSecret: env.JWT_REFRESH_TOKEN_SECRET as string,
};

export default environment;
