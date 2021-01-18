import Enroll from '../models/enroll.model';
import ICourse from '../interfaces/course.interface';
import Course from '../models/course.model';
import { ICourseDetails } from '../interfaces/response.interface';

export const create = async (
    name: string,
    description: string,
    price: number,
    instructorId: string
): Promise<ICourse> => {
    const course: ICourse = new Course({
        instructorId,
        name,
        description,
        price,
        avgRatings: 0,
        isPublic: 0
    });
    await course.save();
    return course;
};

export const getAll = async (instructorId: string): Promise<ICourse[]> => {
    const courses: ICourse[] = await Course.find({
        instructorId
    });
    return courses;
};

export const getDetails = async (
    instructorId: string,
    courseId: string
): Promise<ICourseDetails> => {
    const course: ICourse | null = await Course.findOne({
        instructorId,
        _id: courseId
    });
    if (!course) throw new Error('Course Not Found');
    await course.populate({ path: 'videos', select: '-_id' }).execPopulate();
    const studentsEnrolled: number = await Enroll.countDocuments({
        courseId
    });
    return { course, studentsEnrolled };
};

export const update = async (
    instructorId: string,
    courseId: string,
    name: string,
    description: string,
    price: number
): Promise<ICourse> => {
    const course: ICourse | null = await Course.findOne({
        instructorId,
        _id: courseId
    });
    if (!course) throw new Error('Course Not Found');
    course.name = name;
    course.description = description;
    course.price = price;
    await course.save();
    return course;
};

export const deleteCourse = async (
    instructorId: string,
    courseId: string
): Promise<ICourse> => {
    const course: ICourse | null = await Course.findOne({
        instructorId,
        _id: courseId
    });
    if (!course) throw new Error('Course Not Found');
    await course.remove();
    return course;
};

export const makeAvailable = async (
    instructorId: string,
    courseId: string,
    isPublic: number
): Promise<ICourse> => {
    const course: ICourse | null = await Course.findOne({
        instructorId,
        _id: courseId
    });
    if (!course) throw new Error('Course Not Found');
    course.isPublic = isPublic === 1 ? 1 : 0;
    await course.save();
    return course;
};
