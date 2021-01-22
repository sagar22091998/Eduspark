import Quiz from '../models/quiz.model';
import IQuiz from '../interfaces/quiz.interface';
import { checkInstructor } from '../helpers/instructor_course.helper';
import IScore from '../interfaces/score.interface';
import Score from '../models/score.model';

export const create = async (
    instructorId: string,
    courseId: string,
    topic: string,
    description: string,
    totalTime: number
): Promise<IQuiz> => {
    await checkInstructor(instructorId, courseId);
    const lastQuiz: IQuiz | null = await Quiz.findOne({
        courseId
    }).sort('-quizNumber');
    let quizNumber = 1;
    if (lastQuiz) {
        quizNumber = lastQuiz.quizNumber + 1;
    }
    const quiz: IQuiz = new Quiz({
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
    const quizzes: IQuiz[] = await Quiz.find({
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
    const quiz: IQuiz | null = await Quiz.findOne({
        courseId,
        quizNumber
    });
    if (!quiz) throw new Error('Quiz not found');
    await quiz
        .populate({
            path: 'questions',
            select: '-_id',
            options: { sort: { quizNumber: 1 } }
        })
        .execPopulate();
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
    const quiz: IQuiz | null = await Quiz.findOne({
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
    const quizzes: IQuiz[] = await Quiz.find({
        courseId,
        quizNumber: { $in: [first, second] }
    });
    if (quizzes.length !== 2) throw new Error('Quiz not found');
    const firstQuiz: IQuiz = quizzes[0];
    const secondQuiz: IQuiz = quizzes[1];
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
    const quiz: IQuiz | null = await Quiz.findOne({
        courseId,
        quizNumber
    });
    if (!quiz) throw new Error('Quiz not found');
    const quizzes: IQuiz[] = await Quiz.find({
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

export const leaderboard = async (
    instructorId: string,
    courseId: string,
    quizNumber: number
): Promise<IScore[]> => {
    await checkInstructor(instructorId, courseId);
    const quiz: IQuiz | null = await Quiz.findOne({
        courseId,
        quizNumber
    });
    if (!quiz) throw new Error('Quiz not found');
    const scores: IScore[] = await Score.find({
        quizId: quiz._id
    })
        .sort({ score: -1, duration: 1 })
        .populate('studentId', '-_id name');
    return scores;
};
