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
exports.deleteQuiz = exports.shift = exports.update = exports.getDetails = exports.viewAll = exports.create = void 0;
const quiz_model_1 = __importDefault(require("../models/quiz.model"));
const instructor_course_helper_1 = require("../helpers/instructor_course.helper");
const create = (instructorId, courseId, topic, description, totalTime) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const lastQuiz = yield quiz_model_1.default.findOne({
        courseId
    }).sort('-quizNumber');
    let quizNumber = 1;
    if (lastQuiz) {
        quizNumber = lastQuiz.quizNumber + 1;
    }
    const quiz = new quiz_model_1.default({
        courseId,
        topic,
        description,
        totalTime,
        quizNumber
    });
    yield quiz.save();
    return quiz;
});
exports.create = create;
const viewAll = (instructorId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const quizzes = yield quiz_model_1.default.find({
        courseId
    }).sort('quizNumber');
    return quizzes;
});
exports.viewAll = viewAll;
const getDetails = (instructorId, courseId, quizNumber) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const quiz = yield quiz_model_1.default.findOne({
        courseId,
        quizNumber
    })
        .populate('questions')
        .exec();
    return quiz;
});
exports.getDetails = getDetails;
const update = (instructorId, courseId, quizNumber, topic, description, totalTime) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const quiz = yield quiz_model_1.default.findOne({
        courseId,
        quizNumber
    });
    if (!quiz)
        throw new Error('Quiz not found');
    quiz.topic = topic;
    quiz.description = description;
    quiz.totalTime = totalTime;
    yield quiz.save();
    return quiz;
});
exports.update = update;
const shift = (instructorId, courseId, first, second) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    if (first === second)
        throw new Error('Quiz should not be same');
    const quizzes = yield quiz_model_1.default.find({
        courseId,
        quizNumber: { $in: [first, second] }
    });
    if (quizzes.length !== 2)
        throw new Error('Quiz not found');
    const firstQuiz = quizzes[0];
    const secondQuiz = quizzes[1];
    [firstQuiz.quizNumber, secondQuiz.quizNumber] = [
        secondQuiz.quizNumber,
        firstQuiz.quizNumber
    ];
    const responseData = [];
    yield firstQuiz.save();
    yield secondQuiz.save();
    responseData.push(firstQuiz, secondQuiz);
    return responseData;
});
exports.shift = shift;
const deleteQuiz = (instructorId, courseId, quizNumber) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const quiz = yield quiz_model_1.default.findOne({
        courseId,
        quizNumber
    });
    if (!quiz)
        throw new Error('Quiz not found');
    const quizzes = yield quiz_model_1.default.find({
        courseId,
        quizNumber: { $gte: quizNumber }
    });
    yield Promise.all(quizzes.map((element) => __awaiter(void 0, void 0, void 0, function* () {
        element.quizNumber--;
        yield element.save();
    })));
    yield quiz.remove();
    return quiz;
});
exports.deleteQuiz = deleteQuiz;
//# sourceMappingURL=instructor_quiz.controller.js.map