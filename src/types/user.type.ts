import { ObjectId } from 'mongoose';

export interface IUser {
    _id?: ObjectId;
    first_name: string;
    last_name?: string;
    password: string;
    email: string;
    refresh_token?: string;
    comparePasswords(password: string): Promise<boolean>;
}
