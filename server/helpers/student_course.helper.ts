import Enroll from '../models/enroll.model';
import IEnroll from '../interfaces/enroll.interface';

export const checkStudent = async (
    studentId: string,
    courseId: string
): Promise<IEnroll> => {
    const enroll: IEnroll | null = await Enroll.findOne({
        studentId,
        courseId
    });
    if (!enroll) throw new Error('Not enrolled in this course');
    return enroll;
};
