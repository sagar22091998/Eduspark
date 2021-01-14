import { Schema, model, Model } from 'mongoose';
import IVideo from '../interfaces/video.interface';

const videoSchema = new Schema(
    {
        courseId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Course'
        },
        topic: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true
        },
        publicId: {
            type: String,
            trim: true,
            required: true
        },
        videoNumber: {
            type: Number,
            required: true
        },
        quizNext: {
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

videoSchema.methods.toJSON = function () {
    const video = this!;
    const videoObject = video.toObject();
    delete videoObject._id;
    delete videoObject.courseId;
    return videoObject;
};

const Video: Model<IVideo> = model<IVideo>('Video', videoSchema);
export default Video;
