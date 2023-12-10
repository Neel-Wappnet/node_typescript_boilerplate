import { Model, Schema, model } from 'mongoose';
import { IUser } from '../types';
import { NextFunction } from 'express';
import { compare, hash } from 'bcrypt';
import { ApiError } from '../utils';
import { StatusCodes } from 'http-status-codes';

const userSchema = new Schema<IUser>(
    {
        first_name: { type: 'string', required: true },
        last_name: { type: 'string', required: false },
        password: { type: 'string', required: true },
        email: { type: 'string', required: true },
        refresh_token: { type: 'string', required: false },
    },
    {
        timestamps: true,
    },
);

userSchema.methods.comparePasswords = async function (this, password: string) {
    return compare(password, this.password);
};

userSchema.pre('save', async function (this, next: NextFunction) {
    try {
        const hashPass = await hash(this.password, 10);
        this.password = hashPass;
        next();
    } catch (error) {
        const err = new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error?.message, error?.stack);
        next(err);
    }
});

export const User: Model<IUser> = model<IUser>('User', userSchema);
