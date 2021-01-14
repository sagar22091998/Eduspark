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
exports.makeAvailable = exports.deleteCourse = exports.update = exports.getDetails = exports.getAll = exports.create = void 0;
const enroll_model_1 = __importDefault(require("../models/enroll.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const create = (name, description, price, instructorId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = new course_model_1.default({
        instructorId,
        name,
        description,
        price,
        avgRatings: 0,
        isPublic: 0
    });
    yield course.save();
    return course;
});
exports.create = create;
const getAll = (instructorId) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield course_model_1.default.find({
        instructorId
    });
    return courses;
});
exports.getAll = getAll;
const getDetails = (instructorId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.findOne({
        instructorId,
        _id: courseId
    });
    if (!course)
        throw new Error('Course Not Found');
    yield course.populate({ path: 'videos', select: '-_id' }).execPopulate();
    const studentsEnrolled = yield enroll_model_1.default.countDocuments({
        courseId
    });
    return { course, studentsEnrolled };
});
exports.getDetails = getDetails;
const update = (instructorId, courseId, name, description, price) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.findOne({
        instructorId,
        _id: courseId
    });
    if (!course)
        throw new Error('Course Not Found');
    course.name = name;
    course.description = description;
    course.price = price;
    yield course.save();
    return course;
});
exports.update = update;
const deleteCourse = (instructorId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.findOne({
        instructorId,
        _id: courseId
    });
    if (!course)
        throw new Error('Course Not Found');
    yield course.remove();
    return course;
});
exports.deleteCourse = deleteCourse;
const makeAvailable = (instructorId, courseId, isPublic) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.findOne({
        instructorId,
        _id: courseId
    });
    if (!course)
        throw new Error('Course Not Found');
    course.isPublic = isPublic === 1 ? 1 : 0;
    yield course.save();
    return course;
});
exports.makeAvailable = makeAvailable;
//# sourceMappingURL=instructor_courses.controller.js.map