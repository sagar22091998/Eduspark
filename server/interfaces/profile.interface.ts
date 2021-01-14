import { Document } from 'mongoose';

export default interface IProfileModel extends Document {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    createdAt: Date;
    updatedAt: Date;
}
