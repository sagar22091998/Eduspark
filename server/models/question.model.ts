import { Schema, model, Model } from 'mongoose';
import IQuestion from '../interfaces/question.interface';

const questionSchema = new Schema(
    {
        quizId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Quiz'
        },
        questionNumber: {
            type: Number,
            unique: true,
            required: true
        },
        question: {
            type: String,
            required: true,
            trim: true
        },
        option1: {
            type: String,
            required: true,
            trim: true
        },
        option2: {
            type: String,
            required: true,
            trim: true
        },
        option3: {
            type: String,
            required: true,
            trim: true
        },
        option4: {
            type: String,
            required: true,
            trim: true
        },
        correctAnswer: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Question: Model<IQuestion> = model<IQuestion>('Question', questionSchema);
export default Question;
