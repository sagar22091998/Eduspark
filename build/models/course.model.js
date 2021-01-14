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
const mongoose_1 = require("mongoose");
const video_model_1 = __importDefault(require("./video.model"));
const enroll_model_1 = __importDefault(require("./enroll.model"));
const quiz_model_1 = __importDefault(require("./quiz.model"));
const courseSchema = new mongoose_1.Schema({
    instructorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    avgRatings: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false,
    toObject: { virtuals: true }
});
courseSchema.virtual('videos', {
    ref: 'Video',
    localField: '_id',
    foreignField: 'courseId',
});
courseSchema.methods.toJSON = function () {
    const course = this;
    const courseObject = course.toObject();
    delete courseObject.instructorId;
    return courseObject;
};
courseSchema.pre('remove' || 'deleteMany', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield video_model_1.default.deleteMany({ courseId: this._id });
        yield enroll_model_1.default.deleteMany({ courseId: this._id });
        const quiz = yield quiz_model_1.default.find({ courseId: this._id });
        yield Promise.all(quiz.map((element) => __awaiter(this, void 0, void 0, function* () {
            yield element.remove();
        })));
        next();
    });
});
const Course = mongoose_1.model('Course', courseSchema);
exports.default = Course;
//# sourceMappingURL=course.model.js.map