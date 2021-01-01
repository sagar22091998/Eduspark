import { Document } from 'mongoose';

export default interface IProfile extends Document {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    profileType: boolean;
    createdAt: Date;
    updatedAt: Date;
}
