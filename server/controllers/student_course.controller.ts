import Course from '../models/course.model';
import ICourse from '../interfaces/course.interface';
import IEnroll from '../interfaces/enroll.interface';
import Enroll from '../models/enroll.model';
import IVideo from '../interfaces/video.interface';
import Video from '../models/video.model';
import { IProgressDetails } from '../interfaces/response.interface';

export const purchaseCourse = async (
    studentId: string,
    courseId: string
): Promise<IEnroll> => {
    const course: ICourse | null = await Course.findOne({
        _id: courseId
    });
    if (!course) throw new Error('Course not found');
    if (course.instructorId.equals(studentId))
        throw new Error('Instructor cannot purchase his own course');
    const alreadyEnrolled: IEnroll | null = await Enroll.findOne({
        studentId,
        courseId
    });
    if (alreadyEnrolled) throw new Error('Already enrolled in the course');

    const enroll: IEnroll = new Enroll({
        studentId,
        courseId: courseId,
        videoCompleted: 1,
        videoProgress: 0
    });
    await enroll.save();
    return enroll;
};

export const purchasedCourses = async (
    studentId: string
): Promise<IEnroll[]> => {
    const enroll: IEnroll[] = await Enroll.find({
        studentId
    }).populate('courseId', '-instructorId');
    return enroll;
};

export const getProgress = async (
    studentId: string,
    courseId: string
): Promise<IProgressDetails> => {
    const enroll: IEnroll | null = await Enroll.findOne({
        courseId,
        studentId
    });
    if (!enroll) throw new Error('Not enrolled in this course');
    const videos: IVideo[] = await Video.find({
        courseId
    })
        .sort('videoNumber')
        .lean();
    videos.forEach((video: IVideo) => {
        if (video.videoNumber > enroll.videoCompleted) {
            delete video.publicId;
        }
    });
    return { enroll, videos };
};

export const updateProgress = async (
    studentId: string,
    courseId: string,
    videoProgress: number
): Promise<IProgressDetails> => {
    const enroll: IEnroll | null = await Enroll.findOne({
        courseId,
        studentId
    });
    if (!enroll) throw new Error('Not enrolled in this course');
    const videos: IVideo[] = await Video.find({
        courseId
    })
        .sort('videoNumber')
        .lean();
    if (enroll.videoCompleted < videos.length) {
        if (videoProgress >= 90) {
            enroll.videoProgress = 0;
            enroll.videoCompleted++;
        } else {
            enroll.videoProgress = videoProgress;
        }
        await enroll.save();
    }
    videos.forEach((video: IVideo) => {
        if (video.videoNumber > enroll.videoCompleted) {
            delete video.publicId;
        }
    });
    return { enroll, videos };
};
