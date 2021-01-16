import Quiz from '../models/quiz.model';
import { checkStudent } from '../helpers/student_course.helper';
import IQuiz from '../interfaces/quiz.interface';
import IEnroll from '../interfaces/enroll.interface';
import IScore from '../interfaces/score.interface';
import Score from '../models/score.model';
import { insertRedis } from '../helpers/redis.helper';
import IQuestion from '../interfaces/question.interface';
import Question from '../models/question.model';

export interface IStartQuiz {
    quiz: IQuiz;
    questions: IQuestion[];
}

export const startQuiz = async (
    courseId: string,
    studentId: string,
    quizNumber: number
): Promise<IStartQuiz> => {
    const enroll: IEnroll = await checkStudent(studentId, courseId);
    const quiz: IQuiz | null = await Quiz.findOne({
        courseId,
        quizNumber
    });
    if (!quiz) throw new Error('Quiz not found');
    const score: IScore | null = await Score.findOne({
        studentId,
        quizId: quiz._id
    });
    if (score) throw new Error('Already attempted the quiz');

    const key = `${enroll._id}_${quizNumber}`;
    await insertRedis(key, quiz, quiz.totalTime);
    const questions: IQuestion[] = await Question.find(
        {
            quizId: quiz._id
        },
        { correctAnswer: 0 }
    );

    return { quiz, questions };
};
