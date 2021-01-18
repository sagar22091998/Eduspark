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
exports.leaderboard = exports.listAll = exports.endQuiz = exports.startQuiz = void 0;
const quiz_model_1 = __importDefault(require("../models/quiz.model"));
const student_course_helper_1 = require("../helpers/student_course.helper");
const score_model_1 = __importDefault(require("../models/score.model"));
const redis_helper_1 = require("../helpers/redis.helper");
const question_model_1 = __importDefault(require("../models/question.model"));
const startQuiz = (courseId, studentId, quizNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const enroll = yield student_course_helper_1.checkStudent(studentId, courseId);
    const quiz = yield quiz_model_1.default.findOne({
        courseId,
        quizNumber
    });
    if (!quiz)
        throw new Error('Quiz not found');
    const score = yield score_model_1.default.findOne({
        studentId,
        quizId: quiz._id
    });
    if (score)
        throw new Error('Already attempted the quiz');
    const key = `${enroll._id}_${quizNumber}`;
    let timeLeft = quiz.totalTime;
    const alreadyPresent = yield redis_helper_1.getRedis(key);
    if (alreadyPresent) {
        const totalTimeLeft = yield redis_helper_1.expireRedis(key);
        timeLeft = Math.round((totalTimeLeft / 60) * 100) / 100;
    }
    else {
        yield redis_helper_1.insertRedis(key, quiz, quiz.totalTime * 60);
    }
    const questions = yield question_model_1.default.find({ quizId: quiz._id }, { correctAnswer: 0 }).sort('questionNumber');
    return { quiz, questions, timeLeft };
});
exports.startQuiz = startQuiz;
const endQuiz = (courseId, studentId, quizNumber, answers) => __awaiter(void 0, void 0, void 0, function* () {
    const enroll = yield student_course_helper_1.checkStudent(studentId, courseId);
    const quiz = yield quiz_model_1.default.findOne({
        courseId,
        quizNumber
    });
    if (!quiz)
        throw new Error('Quiz not found');
    const key = `${enroll._id}_${quizNumber}`;
    const quizStart = yield redis_helper_1.getRedis(key);
    if (!quizStart)
        throw new Error('Quiz time is over');
    const totalTimeLeft = yield redis_helper_1.expireRedis(key);
    const duration = Math.round((quiz.totalTime - totalTimeLeft / 60) * 100) / 100;
    const questions = yield question_model_1.default.find({ quizId: quiz._id });
    let totalScore = 0;
    questions.forEach((question) => {
        const attempted = answers.find((ele) => ele.questionNumber === question.questionNumber);
        if (attempted && attempted.option > 0 && attempted.option <= 4) {
            if (attempted.option === question.correctAnswer) {
                totalScore++;
            }
        }
    });
    const score = new score_model_1.default({
        quizId: quiz._id,
        studentId,
        score: totalScore,
        duration
    });
    yield score.save();
    score.studentId = undefined;
    yield redis_helper_1.deleteRedis(key);
    return score;
});
exports.endQuiz = endQuiz;
const listAll = (studentId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    yield student_course_helper_1.checkStudent(studentId, courseId);
    const quizzes = yield quiz_model_1.default.find({
        courseId
    });
    const quizzesId = quizzes.map((ele) => ele._id);
    const scores = yield score_model_1.default.find({
        studentId,
        quizId: { $in: quizzesId }
    }, { studentId: 0 });
    const responseData = [];
    quizzes.forEach((quiz) => {
        const score = scores.find((ele) => { var _a; return (_a = ele.quizId) === null || _a === void 0 ? void 0 : _a.equals(quiz._id); });
        responseData.push({ quiz, score });
    });
    return responseData;
});
exports.listAll = listAll;
const leaderboard = (studentId, courseId, quizNumber) => __awaiter(void 0, void 0, void 0, function* () {
    yield student_course_helper_1.checkStudent(studentId, courseId);
    const quiz = yield quiz_model_1.default.findOne({
        courseId,
        quizNumber
    });
    if (!quiz)
        throw new Error('Quiz not found');
    const score = yield score_model_1.default.findOne({
        quizId: quiz._id,
        studentId
    }, { studentId: 0 });
    if (!score)
        throw new Error('Not attempted the quiz');
    const scores = yield score_model_1.default.find({
        quizId: quiz._id
    })
        .sort({ score: -1, duration: 1 })
        .populate('studentId', '-_id name');
    return { myScore: score, allScores: scores };
});
exports.leaderboard = leaderboard;
//# sourceMappingURL=student_quiz.controller.js.map