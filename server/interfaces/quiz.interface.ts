import { Document, Types } from 'mongoose';

export default interface IQuiz extends Document {
    courseId: Types.ObjectId;
    topic: string;
    description: string;
    totalTime: number;
    quizNumber: number;
    createdAt: Date;
    updatedAt: Date;
}
