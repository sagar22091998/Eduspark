import { Document, Types } from 'mongoose';

export default interface IScore extends Document {
    studentId?: Types.ObjectId;
    quizId?: Types.ObjectId;
    score: number;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
}
