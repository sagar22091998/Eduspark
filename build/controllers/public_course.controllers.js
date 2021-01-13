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
exports.details = exports.loggedInDetails = exports.viewAll = void 0;
const course_model_1 = __importDefault(require("../models/course.model"));
const viewAll = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 8;
    const courses = yield course_model_1.default.find({})
        .skip(page * limit)
        .limit(limit);
    return courses;
});
exports.viewAll = viewAll;
const loggedInDetails = (courseId, instructorId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.findOne({
        _id: courseId
    }).lean();
    if (!course)
        throw new Error('Course not found');
    if (course.instructorId.equals(instructorId)) {
        course.isInstructor = 1;
    }
    else {
        course.isInstructor = 0;
    }
    delete course.instructorId;
    return course;
});
exports.loggedInDetails = loggedInDetails;
const details = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.findOne({
        _id: courseId
    });
    if (!course)
        throw new Error('Course not found');
    return course;
});
exports.details = details;
//# sourceMappingURL=public_course.controllers.js.map