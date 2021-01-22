import { Document, Types } from 'mongoose';

export default interface ICourse extends Document {
    _id: Types.ObjectId;
    instructorId: Types.ObjectId;
    name: string;
    description: string;
    price: number;
    avgRatings: number;
    isPublic: number;
    createdAt: Date;
    updatedAt: Date;
}
