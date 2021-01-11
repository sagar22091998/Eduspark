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
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

quizSchema.virtual('questions', {
    ref: 'Question',
    localField: '_id',
    foreignField: 'quizId'
});

quizSchema.methods.toJSON = function() {
    const quiz = this!;
    const quizObj = quiz.toObject();
    
    delete quizObj._id;
    delete quizObj.courseId;

    return quizObj;
}

quizSchema.pre('remove' || 'deleteMany', async function (next) {
    await Question.deleteMany({ quizId: this._id });
    await Score.deleteMany({ quizId: this._id });
    next();
});

const Quiz: Model<IQuiz> = model<IQuiz>('Quiz', quizSchema);
export default Quiz;
