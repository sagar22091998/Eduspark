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
exports.details = exports.loggedInDetails = exports.loginViewAll = exports.viewAll = void 0;
const course_model_1 = __importDefault(require("../models/course.model"));
const enroll_model_1 = __importDefault(require("../models/enroll.model"));
const viewAll = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 8;
    const courses = yield course_model_1.default.find({ isPublic: 1 })
        .skip(page * limit)
        .limit(limit);
    return courses;
});
exports.viewAll = viewAll;
const loginViewAll = (page, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 8;
    const courses = yield course_model_1.default.find({ isPublic: 1 })
        .skip(page * limit)
        .limit(limit)
        .lean();
    const coursesArr = [];
    courses.forEach((course) => {
        var _a;
        coursesArr.push(course._id);
        if ((_a = course.instructorId) === null || _a === void 0 ? void 0 : _a.equals(userId)) {
            course.isInstructor = 1;
        }
        else {
            course.isInstructor = 0;
        }
        course.isPurchased = 0;
        delete course.instructorId;
    });
    const enrolls = yield enroll_model_1.default.find({
        courseId: { $in: coursesArr },
        studentId: userId
    });
    courses.forEach((course) => {
        if (enrolls.some((enroll) => { var _a; return (_a = enroll.courseId) === null || _a === void 0 ? void 0 : _a.equals(course._id); })) {
            course.isPurchased = 1;
        }
    });
    return courses;
});
exports.loginViewAll = loginViewAll;
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