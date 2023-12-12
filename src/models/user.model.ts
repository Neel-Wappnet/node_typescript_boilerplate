import { Schema, model } from 'mongoose';
import { IUser } from '../types';
import { NextFunction } from 'express';
import { compare, hash } from 'bcrypt';
import { ApiError } from '../utils';
import { StatusCodes } from 'http-status-codes';

interface IUserDocument extends IUser, Document {
    comparePasswords: (password: string) => Promise<boolean>;
    deleteRefreshToken: () => Promise<void>;
}

const userSchema: Schema<IUserDocument> = new Schema(
    {
        first_name: { type: 'string', required: true },
        last_name: { type: 'string', required: false },
        password: { type: 'string', required: true },
        email: { type: 'string', trim: true, required: true },
        refresh_token: { type: 'string', required: false },
    },
    {
        timestamps: true,
    },
);

userSchema.methods.comparePasswords = async function (password: string) {
    const user = this as IUserDocument;
    return await compare(password, user.password);
};

userSchema.methods.deleteRefreshToken = async function (): Promise<void> {
    const user = this as IUserDocument;
    delete user.refresh_token;
    await User.updateOne({ _id: user._id }, { user });
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

export const User = model<IUserDocument>('User', userSchema);
