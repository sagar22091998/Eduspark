import { Schema, model, Model } from 'mongoose';
import IEnroll from '../interfaces/enroll.interface';

const enrollSchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Profile'
        },
        courseId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Course'
        },
        paymentType: {
            type: String,
            trim: true
        },
        paymentStatus: {
            type: String,
            trim: true
        },
        orderId: {
            type: String,
            trim: true
        },
        paymentTxn: {
            type: String,
            trim: true
        },
        videoCompleted: {
            type: Number,
            required: true,
            default: 0
        },
        videoProgress: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Enroll: Model<IEnroll> = model<IEnroll>('Enroll', enrollSchema);
export default Enroll;
