import { Schema, model, Model } from 'mongoose';
import Video from './video.model';
import Enroll from './enroll.model';
import Quiz from './quiz.model';
import ICourse from '../interfaces/course.interface';

const courseSchema = new Schema(
    {
        instructorId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Profile'
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true
        },
        avgRatings: {
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

courseSchema.pre('remove' || 'deleteMany', async function (next) {
    await Video.deleteMany({ courseId: this._id });
    await Enroll.deleteMany({ courseId: this._id });
    await Quiz.deleteMany({ courseId: this._id });
    next();
});

const Course: Model<ICourse> = model<ICourse>('Course', courseSchema);
export default Course;
