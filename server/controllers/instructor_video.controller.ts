import IVideo from '../interfaces/video.interface';
import Video from '../models/video.model';
import { checkInstructor } from '../helpers/instructor_course.helper';

export const addNew = async (
    instructorId: string,
    courseId: string,
    topic: string,
    description: string,
    publicId: string
): Promise<IVideo> => {
    await checkInstructor(instructorId, courseId);
    const lastVideo: IVideo | null = await Video.findOne({
        courseId
    }).sort('-videoNumber');
    let videoNumber = 1;
    if (lastVideo) {
        videoNumber = lastVideo.videoNumber + 1;
    }
    const video: IVideo = new Video({
        courseId,
        topic,
        description,
        publicId,
        videoNumber
    });
    await video.save();
    return video;
};

export const getAll = async (
    instructorId: string,
    courseId: string
): Promise<IVideo[]> => {
    await checkInstructor(instructorId, courseId);
    const videos: IVideo[] = await Video.find({
        courseId
    }).sort('videoNumber');
    return videos;
};

export const getDetails = async (
    instructorId: string,
    courseId: string,
    videoNumber: number
): Promise<IVideo> => {
    await checkInstructor(instructorId, courseId);
    const video: IVideo | null = await Video.findOne({
        courseId,
        videoNumber
    });
    if (!video) {
        throw new Error('Video not found');
    }
    return video;
};

export const update = async (
    instructorId: string,
    videoNumber: number,
    courseId: string,
    topic: string,
    description: string,
    publicId: string
): Promise<IVideo> => {
    await checkInstructor(instructorId, courseId);
    const video: IVideo | null = await Video.findOne({
        videoNumber,
        courseId
    });
    if (!video) throw new Error('Video not found');
    video.topic = topic;
    video.description = description;
    video.publicId = publicId;
    await video.save();
    return video;
};

export const shift = async (
    instructorId: string,
    courseId: string,
    first: number,
    second: number
): Promise<IVideo[]> => {
    await checkInstructor(instructorId, courseId);
    if (first === second) throw new Error('Videos should not be same');
    const videos: IVideo[] = await Video.find({
        courseId,
        videoNumber: { $in: [first, second] }
    });
    if (videos.length !== 2) throw new Error('Video not found');
    const firstVideo: IVideo = videos[0];
    const secondVideo: IVideo = videos[1];
    [firstVideo.videoNumber, secondVideo.videoNumber] = [
        secondVideo.videoNumber,
        firstVideo.videoNumber
    ];
    await firstVideo.save();
    await secondVideo.save();
    const responseData: IVideo[] = [];
    responseData.push(firstVideo, secondVideo);
    return responseData;
};

export const deleteVideo = async (
    instructorId: string,
    courseId: string,
    videoNumber: number
): Promise<IVideo> => {
    await checkInstructor(instructorId, courseId);
    const video: IVideo | null = await Video.findOne({
        videoNumber,
        courseId
    });
    if (!video) throw new Error('Video not found');

    const videos: IVideo[] = await Video.find({
        courseId,
        videoNumber: { $gte: videoNumber }
    });
    await Promise.all(
        videos.map(async (element) => {
            element.videoNumber--;
            await element.save();
        })
    );
    await video.remove();
    return video;
};
