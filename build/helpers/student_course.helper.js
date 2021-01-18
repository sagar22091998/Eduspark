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
exports.checkStudent = void 0;
const enroll_model_1 = __importDefault(require("../models/enroll.model"));
const checkStudent = (studentId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const enroll = yield enroll_model_1.default.findOne({
        studentId,
        courseId
    });
    if (!enroll)
        throw new Error('Not enrolled in this course');
    return enroll;
});
exports.checkStudent = checkStudent;
//# sourceMappingURL=student_course.helper.js.map