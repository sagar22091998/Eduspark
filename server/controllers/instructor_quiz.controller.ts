import Quiz from '../models/quiz.model';
import IQuiz from '../interfaces/quiz.interface';
import { checkInstructor } from '../helpers/instructor_course.helper';

export const create = async (
    instructorId: string,
    courseId: string,
    topic: string,
    description: string,
    totalTime: number
): Promise<IQuiz> => {
    await checkInstructor(instructorId, courseId);
    const lastQuiz = await Quiz.findOne({
        courseId
    }).sort('-quizNumber');
    let quizNumber = 1;
    if (lastQuiz) {
        quizNumber = lastQuiz.quizNumber + 1;
    }
    const quiz = new Quiz({
        courseId,
        topic,
        description,
        totalTime,
        quizNumber
    });
    await quiz.save();
    return quiz;
};

export const viewAll = async (
    instructorId: string,
    courseId: string
): Promise<IQuiz[]> => {
    await checkInstructor(instructorId, courseId);
    const quizzes = await Quiz.find({
        courseId
    }).sort('quizNumber');
    return quizzes;
};

export const getDetails = async (
    instructorId: string,
    courseId: string,
    quizNumber: number
): Promise<unknown> => {
    await checkInstructor(instructorId, courseId);
    const quiz = await Quiz.findOne({
        courseId,
        quizNumber
    })
        .populate('questions')
        .exec();
    return quiz;
};

export const update = async (
    instructorId: string,
    courseId: string,
    quizNumber: number,
    topic: string,
    description: string,
    totalTime: number
): Promise<IQuiz> => {
    await checkInstructor(instructorId, courseId);
    const quiz = await Quiz.findOne({
        courseId,
        quizNumber
    });
    if (!quiz) throw new Error('Quiz not found');
    quiz.topic = topic;
    quiz.description = description;
    quiz.totalTime = totalTime;
    await quiz.save();
    return quiz;
};

export const shift = async (
    instructorId: string,
    courseId: string,
    first: number,
    second: number
): Promise<IQuiz[]> => {
    await checkInstructor(instructorId, courseId);
    if (first === second) throw new Error('Quiz should not be same');
    const firstQuiz = await Quiz.findOne({
        quizNumber: first,
        courseId
    });
    if (!firstQuiz) throw new Error('Quiz not found');
    const secondQuiz = await Quiz.findOne({
        quizNumber: second,
        courseId
    });
    if (!secondQuiz) throw new Error('Quiz not found');
    [firstQuiz.quizNumber, secondQuiz.quizNumber] = [
        secondQuiz.quizNumber,
        firstQuiz.quizNumber
    ];
    const responseData: IQuiz[] = [];
    await firstQuiz.save();
    await secondQuiz.save();
    responseData.push(firstQuiz, secondQuiz);
    return responseData;
};

export const deleteQuiz = async (
    instructorId: string,
    courseId: string,
    quizNumber: number
): Promise<IQuiz> => {
    await checkInstructor(instructorId, courseId);
    const quiz = await Quiz.findOne({
        courseId,
        quizNumber
    });
    if (!quiz) throw new Error('Quiz not found');
    const quizzes = await Quiz.find({
        courseId,
        quizNumber: { $gte: quizNumber }
    });
    await Promise.all(
        quizzes.map(async (element) => {
            element.quizNumber--;
            await element.save();
        })
    );
    await quiz.remove();
    return quiz;
};
