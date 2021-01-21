import { Document, Types } from 'mongoose';

export default interface IEnroll extends Document {
    studentId?: Types.ObjectId;
    courseId?: Types.ObjectId;
    videoCompleted: number;
    videoProgress: number;
    createdAt: Date;
    updatedAt: Date;
}
