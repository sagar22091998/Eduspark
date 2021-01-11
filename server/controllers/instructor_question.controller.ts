import Question from '../models/question.model';
import IQuestion from '../interfaces/question.interface';
import { checkInstructor } from '../helpers/instructor_course.helper';
import Quiz from '../models/quiz.model';

export const create = async (
    instructorId: string,
    courseId: string,
    quizNumber: number,
    question: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    correctAnswer: number
): Promise<IQuestion> => {
    await checkInstructor(instructorId, courseId);
    const quiz = await Quiz.findOne({
        courseId,
        quizNumber
    });
    if (!quiz) throw new Error('Quiz not found');
    const lastQuestion = await Question.findOne({
        quizId: quiz._id
    }).sort('-questionNumber');
    let questionNumber = 1;
    if (lastQuestion) {
        questionNumber = lastQuestion.questionNumber + 1;
    }
    const questionObj = new Question({
        quizId: quiz._id,
        questionNumber,
        question,
        option1,
        option2,
        option3,
        option4,
        correctAnswer
    });
    await questionObj.save();
    return questionObj;
};

export const viewAll = async (
    instructorId: string,
    courseId: string,
    quizNumber: number
): Promise<IQuestion[]> => {
    await checkInstructor(instructorId, courseId);
    const quiz = await Quiz.findOne({
        courseId,
        quizNumber
    });
    if (!quiz) throw new Error('Quiz not found');
    const questions = await Question.find({
        quizId: quiz._id
    }).sort('questionNumber');
    return questions;
};

export const update = async (
    instructorId: string,
    courseId: string,
    quizNumber: number,
    questionNumber: number,
    question: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    correctAnswer: number
): Promise<IQuestion> => {
    await checkInstructor(instructorId, courseId);
    const quiz = await Quiz.findOne({
        courseId,
        quizNumber
    });
    if (!quiz) throw new Error('Quiz not found');
    const questionObj = await Question.findOne({
        quizId: quiz._id,
        questionNumber
    });
    if (!questionObj) throw new Error('Question not found');
    Object.assign(questionObj, {
        question,
        option1,
        option2,
        option3,
        option4,
        correctAnswer
    });
    await questionObj.save();
    return questionObj;
};

export const shift = async (
    instructorId: string,
    courseId: string,
    quizNumber: number,
    first: number,
    second: number
): Promise<IQuestion[]> => {
    await checkInstructor(instructorId, courseId);
    const quiz = await Quiz.findOne({
        courseId,
        quizNumber
    });
    if (!quiz) throw new Error('Quiz not found');
    const questions = await Question.find({
        quizId: quiz._id,
        questionNumber: { $in: [first, second] }
    });
    if (questions.length !== 2) throw new Error('Question not found');
    [questions[0].questionNumber, questions[1].questionNumber] = [
        questions[1].questionNumber,
        questions[0].questionNumber
    ];
    await questions[0].save();
    await questions[1].save();
    return questions;
};

export const deleteQuestion = async (
    instructorId: string,
    courseId: string,
    quizNumber: number,
    questionNumber: number
): Promise<IQuestion> => {
    await checkInstructor(instructorId, courseId);
    const quiz = await Quiz.findOne({
        courseId,
        quizNumber
    });
    if (!quiz) throw new Error('Quiz not found');
    const questionObj = await Question.findOne({
        quizId: quiz._id,
        questionNumber
    });
    if (!questionObj) throw new Error('Question not found');
    const questions = await Question.find({
        quizId: quiz._id,
        questionNumber: { $gte: questionNumber }
    });
    await Promise.all(
        questions.map(async (element) => {
            element.questionNumber--;
            await element.save();
        })
    );
    await questionObj.remove();
    return questionObj;
};
