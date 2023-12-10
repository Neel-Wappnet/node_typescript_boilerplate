import { ObjectId } from 'mongoose';
import { User } from '../models';
import { IUser } from '../types';
import { logger } from '../utils';

export const createUser = async (payload: IUser): Promise<IUser> => {
    const user = new User(payload);
    return user.save();
};

export const getUserById = async (_id: ObjectId): Promise<IUser> => {
    return User.findById(_id).select('_id first_name last_name email');
};

export const getUserByEmail = async (email: string): Promise<IUser> => {
    return User.findOne({ email }).select('_id first_name last_name email');
};

export const getAllUser = async (): Promise<IUser[]> => {
    return User.find().select('_id first_name last_name email');
};

export const updateUser = async (_id: ObjectId, payload: IUser): Promise<IUser> => {
    const user = new User({ ...payload, _id });
    return user.save();
};

export const deleteUser = (_id: ObjectId) => {
    return User.findByIdAndDelete(_id);
};

export const comparePasswords = (_id: ObjectId, password: string): boolean => {
    logger.warn({ _id, password });
    return true;
};
