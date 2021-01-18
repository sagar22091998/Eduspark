import Quiz from '../models/quiz.model';
import { checkStudent } from '../helpers/student_course.helper';
import IQuiz from '../interfaces/quiz.interface';
import IEnroll from '../interfaces/enroll.interface';
import IScore from '../interfaces/score.interface';
import Score from '../models/score.model';
import {
    deleteRedis,
    expireRedis,
    getRedis,
    insertRedis
} from '../helpers/redis.helper';
import IQuestion from '../interfaces/question.interface';
import Question from '../models/question.model';
import {
    IStartQuiz,
    IAnswers,
    ILeaderboard,
    IQuizList
} from '../interfaces/response.interface';

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
    let timeLeft: number = quiz.totalTime;
    const alreadyPresent = await getRedis(key);
    if (alreadyPresent) {
        const totalTimeLeft: number = await expireRedis(key);
        timeLeft = Math.round((totalTimeLeft / 60) * 100) / 100;
    } else {
        await insertRedis(key, quiz, quiz.totalTime * 60);
    }
    const questions: IQuestion[] = await Question.find(
        { quizId: quiz._id },
        { correctAnswer: 0 }
    ).sort('questionNumber');
    return { quiz, questions, timeLeft };
};

export const endQuiz = async (
    courseId: string,
    studentId: string,
    quizNumber: number,
    answers: IAnswers[]
): Promise<IScore> => {
    const enroll: IEnroll = await checkStudent(studentId, courseId);
    const quiz: IQuiz | null = await Quiz.findOne({
        courseId,
        quizNumber
    });
    if (!quiz) throw new Error('Quiz not found');
    const key = `${enroll._id}_${quizNumber}`;
    const quizStart = await getRedis(key);
    if (!quizStart) throw new Error('Quiz time is over');
    const totalTimeLeft = await expireRedis(key);
    const duration =
        Math.round((quiz.totalTime - totalTimeLeft / 60) * 100) / 100;
    const questions: IQuestion[] = await Question.find({ quizId: quiz._id });
    let totalScore = 0;
    questions.forEach((question: IQuestion) => {
        const attempted = answers.find(
            (ele: IAnswers) => ele.questionNumber === question.questionNumber
        );
        if (attempted && attempted.option > 0 && attempted.option <= 4) {
            if (attempted.option === question.correctAnswer) {
                totalScore++;
            }
        }
    });
    const score: IScore = new Score({
        quizId: quiz._id,
        studentId,
        score: totalScore,
        duration
    });
    await score.save();
    score.studentId = undefined;
    await deleteRedis(key);
    return score;
};

export const listAll = async (
    studentId: string,
    courseId: string
): Promise<IQuizList[]> => {
    await checkStudent(studentId, courseId);
    const quizzes: IQuiz[] = await Quiz.find({
        courseId
    });
    const quizzesId: string[] = quizzes.map((ele) => ele._id);
    const scores = await Score.find(
        {
            studentId,
            quizId: { $in: quizzesId }
        },
        { studentId: 0 }
    );
    const responseData: IQuizList[] = [];
    quizzes.forEach((quiz: IQuiz) => {
        const score: IScore | undefined = scores.find((ele: IScore) =>
            ele.quizId?.equals(quiz._id)
        );
        responseData.push({ quiz, score });
    });
    return responseData;
};

export const leaderboard = async (
    studentId: string,
    courseId: string,
    quizNumber: number
): Promise<ILeaderboard> => {
    await checkStudent(studentId, courseId);
    const quiz: IQuiz | null = await Quiz.findOne({
        courseId,
        quizNumber
    });
    if (!quiz) throw new Error('Quiz not found');
    const score: IScore | null = await Score.findOne(
        {
            quizId: quiz._id,
            studentId
        },
        { studentId: 0 }
    );
    if (!score) throw new Error('Not attempted the quiz');
    const scores: IScore[] = await Score.find({
        quizId: quiz._id
    })
        .sort({ score: -1, duration: 1 })
        .populate('studentId', '-_id name');
    return { myScore: score, allScores: scores };
};
