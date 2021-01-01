import { Document, Types } from 'mongoose';

export default interface IQuestion extends Document {
    quizId: Types.ObjectId;
    questionNumber: number;
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctAnswer: number;
    createdAt: Date;
    updatedAt: Date;
}
