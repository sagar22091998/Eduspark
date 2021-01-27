import Course from '../models/course.model';
import ICourse, { ICourseList } from '../interfaces/course.interface';
import { ObjectId } from 'mongodb';
import Enroll from '../models/enroll.model';

export const viewAll = async (page: number): Promise<ICourse[]> => {
    const limit = 8;

    const courses: ICourse[] = await Course.find({ isPublic: 1 })
        .skip(page * limit)
        .limit(limit);
    return courses;
};

export const loginViewAll = async (
    page: number,
    userId: string
): Promise<ICourseList[]> => {
    const limit = 8;

    const courses: ICourseList[] = await Course.find({ isPublic: 1 })
        .skip(page * limit)
        .limit(limit)
        .lean();
    const coursesArr: ObjectId[] = [];
    courses.forEach((course: ICourseList) => {
        coursesArr.push(course._id);
        if (course.instructorId?.equals(userId)) {
            course.isInstructor = 1;
        } else {
            course.isInstructor = 0;
        }
        course.isPurchased = 0;
        delete course.instructorId;
    });
    const enrolls = await Enroll.find({
        courseId: { $in: coursesArr },
        studentId: userId
    });
    courses.forEach((course: ICourseList) => {
        if (enrolls.some((enroll) => enroll.courseId?.equals(course._id))) {
            course.isPurchased = 1;
        }
    });
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
