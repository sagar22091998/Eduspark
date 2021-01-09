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

const Score: Model<IScore> = model<IScore>('Score', scoreSchema);
export default Score;
