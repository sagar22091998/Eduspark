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

enrollSchema.methods.toJSON = function () {
    const enroll: IEnroll = this!;
    const enrollObj = enroll.toObject();

    delete enrollObj._id;
    delete enrollObj.studentId;

    return enrollObj;
};

const Enroll: Model<IEnroll> = model<IEnroll>('Enroll', enrollSchema);
export default Enroll;
