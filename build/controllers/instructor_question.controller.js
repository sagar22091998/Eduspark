"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestion = exports.shift = exports.update = exports.viewAll = exports.create = void 0;
const question_model_1 = __importDefault(require("../models/question.model"));
const instructor_course_helper_1 = require("../helpers/instructor_course.helper");
const quiz_model_1 = __importDefault(require("../models/quiz.model"));
const create = (instructorId, courseId, quizNumber, question, option1, option2, option3, option4, correctAnswer) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const quiz = yield quiz_model_1.default.findOne({
        courseId,
        quizNumber
    });
    if (!quiz)
        throw new Error('Quiz not found');
    const lastQuestion = yield question_model_1.default.findOne({
        quizId: quiz._id
    }).sort('-questionNumber');
    let questionNumber = 1;
    if (lastQuestion) {
        questionNumber = lastQuestion.questionNumber + 1;
    }
    const questionObj = new question_model_1.default({
        quizId: quiz._id,
        questionNumber,
        question,
        option1,
        option2,
        option3,
        option4,
        correctAnswer
    });
    yield questionObj.save();
    return questionObj;
});
exports.create = create;
const viewAll = (instructorId, courseId, quizNumber) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const quiz = yield quiz_model_1.default.findOne({
        courseId,
        quizNumber
    });
    if (!quiz)
        throw new Error('Quiz not found');
    const questions = yield question_model_1.default.find({
        quizId: quiz._id
    }).sort('questionNumber');
    return questions;
});
exports.viewAll = viewAll;
const update = (instructorId, courseId, quizNumber, questionNumber, question, option1, option2, option3, option4, correctAnswer) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const quiz = yield quiz_model_1.default.findOne({
        courseId,
        quizNumber
    });
    if (!quiz)
        throw new Error('Quiz not found');
    const questionObj = yield question_model_1.default.findOne({
        quizId: quiz._id,
        questionNumber
    });
    if (!questionObj)
        throw new Error('Question not found');
    Object.assign(questionObj, {
        question,
        option1,
        option2,
        option3,
        option4,
        correctAnswer
    });
    yield questionObj.save();
    return questionObj;
});
exports.update = update;
const shift = (instructorId, courseId, quizNumber, first, second) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const quiz = yield quiz_model_1.default.findOne({
        courseId,
        quizNumber
    });
    if (!quiz)
        throw new Error('Quiz not found');
    const questions = yield question_model_1.default.find({
        quizId: quiz._id,
        questionNumber: { $in: [first, second] }
    });
    if (questions.length !== 2)
        throw new Error('Question not found');
    [questions[0].questionNumber, questions[1].questionNumber] = [
        questions[1].questionNumber,
        questions[0].questionNumber
    ];
    yield questions[0].save();
    yield questions[1].save();
    return questions;
});
exports.shift = shift;
const deleteQuestion = (instructorId, courseId, quizNumber, questionNumber) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const quiz = yield quiz_model_1.default.findOne({
        courseId,
        quizNumber
    });
    if (!quiz)
        throw new Error('Quiz not found');
    const questionObj = yield question_model_1.default.findOne({
        quizId: quiz._id,
        questionNumber
    });
    if (!questionObj)
        throw new Error('Question not found');
    const questions = yield question_model_1.default.find({
        quizId: quiz._id,
        questionNumber: { $gte: questionNumber }
    });
    yield Promise.all(questions.map((element) => __awaiter(void 0, void 0, void 0, function* () {
        element.questionNumber--;
        yield element.save();
    })));
    yield questionObj.remove();
    return questionObj;
});
exports.deleteQuestion = deleteQuestion;
//# sourceMappingURL=instructor_question.controller.js.map