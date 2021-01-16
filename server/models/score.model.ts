import { Schema, model, Model } from 'mongoose';
import IScore from '../interfaces/score.interface';

const scoreSchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Profile'
        },
        quizId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Quiz'
        },
        score: {
            type: Number,
            required: true,
            default: 0
        },
        startTime: {
            type: Date,
            required: true
        },
        duration: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

scoreSchema.methods.toJSON = function () {
    const score: IScore = this!;
    const scoreObj = score.toObject();

    delete scoreObj._id;
    delete scoreObj.studentId;
    delete scoreObj.quizId;

    return scoreObj;
};

const Score: Model<IScore> = model<IScore>('Score', scoreSchema);
export default Score;
