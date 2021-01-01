import { Document, Types } from 'mongoose';

export default interface IVideo extends Document {
    courseId: Types.ObjectId;
    topic: string;
    description: string;
    videoURL: string;
    videoNumber: number;
    quizNext: number;
    createdAt: Date;
    updatedAt: Date;
}
