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
        versionKey: false,
        toObject: { virtuals: true }
    }
);

courseSchema.virtual('videos', {
    ref: 'Video',
    localField: '_id',
    foreignField: 'courseId'
});

courseSchema.methods.toJSON = function () {
    const course = this!;
    const courseObject = course.toObject();

    delete courseObject.instructorId;

    return courseObject;
};

courseSchema.pre('remove' || 'deleteMany', async function (next) {
    await Video.deleteMany({ courseId: this._id });
    await Enroll.deleteMany({ courseId: this._id });
    const quiz = await Quiz.find({ courseId: this._id });
    await Promise.all(
        quiz.map(async (element) => {
            await element.remove();
        })
    );
    next();
});

const Course: Model<ICourse> = model<ICourse>('Course', courseSchema);
export default Course;
