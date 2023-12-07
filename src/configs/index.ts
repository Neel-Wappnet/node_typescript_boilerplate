/* eslint-disable no-undef */
import { config } from 'dotenv';
config();

const environment = {
    port: (process.env.PORT as unknown as number) || 3000,
};

export default environment;
