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
exports.deleteVideo = exports.shift = exports.update = exports.getDetails = exports.getAll = exports.addNew = void 0;
const video_model_1 = __importDefault(require("../models/video.model"));
const instructor_course_helper_1 = require("../helpers/instructor_course.helper");
const addNew = (instructorId, courseId, topic, description, publicId) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const lastVideo = yield video_model_1.default.findOne({
        courseId
    }).sort('-videoNumber');
    let videoNumber = 1;
    if (lastVideo) {
        videoNumber = lastVideo.videoNumber + 1;
    }
    const video = new video_model_1.default({
        courseId,
        topic,
        description,
        publicId,
        videoNumber
    });
    yield video.save();
    return video;
});
exports.addNew = addNew;
const getAll = (instructorId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const videos = yield video_model_1.default.find({
        courseId
    }).sort('videoNumber');
    return videos;
});
exports.getAll = getAll;
const getDetails = (instructorId, courseId, videoNumber) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const video = yield video_model_1.default.findOne({
        courseId,
        videoNumber
    });
    if (!video) {
        throw new Error('Video not found');
    }
    return video;
});
exports.getDetails = getDetails;
const update = (instructorId, videoNumber, courseId, topic, description, publicId) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const video = yield video_model_1.default.findOne({
        videoNumber,
        courseId
    });
    if (!video)
        throw new Error('Video not found');
    video.topic = topic;
    video.description = description;
    video.publicId = publicId;
    yield video.save();
    return video;
});
exports.update = update;
const shift = (instructorId, courseId, first, second) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    if (first === second)
        throw new Error('Videos should not be same');
    const firstVideo = yield video_model_1.default.findOne({
        videoNumber: first,
        courseId
    });
    if (!firstVideo)
        throw new Error('Video not found');
    const secondVideo = yield video_model_1.default.findOne({
        videoNumber: second,
        courseId
    });
    if (!secondVideo)
        throw new Error('Video not found');
    [firstVideo.videoNumber, secondVideo.videoNumber] = [
        secondVideo.videoNumber,
        firstVideo.videoNumber
    ];
    yield firstVideo.save();
    yield secondVideo.save();
    const responseData = [];
    responseData.push(firstVideo);
    responseData.push(secondVideo);
    return responseData;
});
exports.shift = shift;
const deleteVideo = (instructorId, courseId, videoNumber) => __awaiter(void 0, void 0, void 0, function* () {
    yield instructor_course_helper_1.checkInstructor(instructorId, courseId);
    const video = yield video_model_1.default.findOne({
        videoNumber,
        courseId
    });
    if (!video)
        throw new Error('Video not found');
    const videos = yield video_model_1.default.find({
        courseId,
        videoNumber: { $gte: videoNumber }
    });
    yield Promise.all(videos.map((element) => __awaiter(void 0, void 0, void 0, function* () {
        element.videoNumber--;
        yield element.save();
    })));
    yield video.remove();
    return video;
});
exports.deleteVideo = deleteVideo;
//# sourceMappingURL=instructor_video.controller.js.map