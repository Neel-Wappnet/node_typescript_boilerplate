import { ObjectId } from 'mongoose';

export type IJWTSign = {
    _id: ObjectId;
    first_name: string;
    email: string;
};

export type IJWTTokens = {
    accessToken: string;
    refreshToken: string;
};
