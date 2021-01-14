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
exports.updateProgress = exports.getProgress = exports.purchasedCourses = exports.purchaseCourse = void 0;
const course_model_1 = __importDefault(require("../models/course.model"));
const enroll_model_1 = __importDefault(require("../models/enroll.model"));
const video_model_1 = __importDefault(require("../models/video.model"));
const purchaseCourse = (studentId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.default.findOne({
        _id: courseId
    });
    if (!course)
        throw new Error('Course not found');
    if (course.instructorId.equals(studentId))
        throw new Error('Instructor cannot purchase his own course');
    const alreadyEnrolled = yield enroll_model_1.default.findOne({
        studentId,
        courseId
    });
    if (alreadyEnrolled)
        throw new Error("Already enrolled in the course");
    const enroll = new enroll_model_1.default({
        studentId,
        courseId: courseId,
        videoCompleted: 1,
        videoProgress: 0
    });
    yield enroll.save();
    return enroll;
});
exports.purchaseCourse = purchaseCourse;
const purchasedCourses = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const enroll = yield enroll_model_1.default.find({
        studentId
    }).populate('courseId', '-instructorId');
    return enroll;
});
exports.purchasedCourses = purchasedCourses;
const getProgress = (studentId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const enroll = yield enroll_model_1.default.findOne({
        courseId,
        studentId
    });
    if (!enroll)
        throw new Error('Not enrolled in this course');
    const videos = yield video_model_1.default.find({
        courseId
    })
        .sort('videoNumber')
        .lean();
    videos.forEach((video) => {
        if (video.videoNumber > enroll.videoCompleted) {
            delete video.publicId;
        }
    });
    return { enroll, videos };
});
exports.getProgress = getProgress;
const updateProgress = (studentId, courseId, videoProgress) => __awaiter(void 0, void 0, void 0, function* () {
    const enroll = yield enroll_model_1.default.findOne({
        courseId,
        studentId
    });
    if (!enroll)
        throw new Error('Not enrolled in this course');
    const videos = yield video_model_1.default.find({
        courseId
    })
        .sort('videoNumber')
        .lean();
    if (enroll.videoCompleted < videos.length) {
        if (videoProgress >= 90) {
            enroll.videoProgress = 0;
            enroll.videoCompleted++;
        }
        else {
            enroll.videoProgress = videoProgress;
        }
        yield enroll.save();
    }
    videos.forEach((video) => {
        if (video.videoNumber > enroll.videoCompleted) {
            delete video.publicId;
        }
    });
    return { enroll, videos };
});
exports.updateProgress = updateProgress;
//# sourceMappingURL=student_course.controller.js.map