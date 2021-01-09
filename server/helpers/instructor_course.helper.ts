import Course from '../models/course.model';

export const checkInstructor = async (
    instructorId: string,
    courseId: string
): Promise<string> => {
    const course = await Course.findOne({
        instructorId,
        _id: courseId
    });
    if (!course) throw new Error('Course Not Found');
    return courseId;
};
