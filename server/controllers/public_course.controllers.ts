import Course from '../models/course.model';
import ICourse from '../interfaces/course.interface';

export const viewAll = async (page: number): Promise<ICourse[]> => {
    const limit = 8;

    const courses: ICourse[] = await Course.find({ isPublic: 1 })
        .skip(page * limit)
        .limit(limit);
    return courses;
};

export const loggedInDetails = async (
    courseId: string,
    instructorId: string
): Promise<ICourse> => {
    const course = await Course.findOne({
        _id: courseId
    }).lean();
    if (!course) throw new Error('Course not found');
    if (course.instructorId.equals(instructorId)) {
        course.isInstructor = 1;
    } else {
        course.isInstructor = 0;
    }
    delete course.instructorId;
    return course;
};

export const details = async (courseId: string): Promise<ICourse> => {
    const course: ICourse | null = await Course.findOne({
        _id: courseId
    });
    if (!course) throw new Error('Course not found');
    return course;
};
