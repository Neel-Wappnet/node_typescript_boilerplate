import { ObjectId } from 'mongoose';

export type IUser = {
    _id?: ObjectId;
    first_name: string;
    last_name?: string;
    password: string;
    email: string;
    refresh_token?: string;
};
