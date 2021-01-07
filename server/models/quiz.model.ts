import { Schema, model, Model } from 'mongoose';
import Score from './score.model';
import Question from './question.model';
import IQuiz from '../interfaces/quiz.interface';

const quizSchema = new Schema(
    {
        courseId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Course'
        },
        topic: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        totalTime: {
            type: Number,
            required: true
        },
        quizNumber: {
            type: Number,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

quizSchema.pre('remove' || 'deleteMany', async function (next) {
    await Question.deleteMany({ quizId: this._id });
    await Score.deleteMany({ quizId: this._id });
    next();
});

const Quiz: Model<IQuiz> = model<IQuiz>('Quiz', quizSchema);
export default Quiz;
