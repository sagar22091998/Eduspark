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

questionSchema.methods.toJSON = function() {
    const question = this!;
    const questionObj = question.toObject();

    delete questionObj._id;
    delete questionObj.quizId;

    return questionObj;
}

const Question: Model<IQuestion> = model<IQuestion>('Question', questionSchema);
export default Question;
