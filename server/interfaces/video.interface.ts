import { Document, Types } from 'mongoose';

export default interface IVideo extends Document {
    courseId: Types.ObjectId;
    topic: string;
    description: string;
    publicId: string;
    videoNumber: number;
    quizNext: number;
    createdAt: Date;
    updatedAt: Date;
}
