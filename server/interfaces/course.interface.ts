import { ObjectId } from 'mongodb';
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

export interface ICourseList {
    _id: ObjectId;
    instructorId?: ObjectId;
    isInstructor: number;
    isPurchased: number;
}
