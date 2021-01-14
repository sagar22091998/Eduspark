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
const score_model_1 = __importDefault(require("./score.model"));
const question_model_1 = __importDefault(require("./question.model"));
const quizSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    topic: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    totalTime: {
        type: Number,
        required: true
    },
    quizNumber: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
quizSchema.virtual('questions', {
    ref: 'Question',
    localField: '_id',
    foreignField: 'quizId'
});
quizSchema.methods.toJSON = function () {
    const quiz = this;
    const quizObj = quiz.toObject();
    delete quizObj._id;
    delete quizObj.courseId;
    return quizObj;
};
quizSchema.pre('remove' || 'deleteMany', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield question_model_1.default.deleteMany({ quizId: this._id });
        yield score_model_1.default.deleteMany({ quizId: this._id });
        next();
    });
});
const Quiz = mongoose_1.model('Quiz', quizSchema);
exports.default = Quiz;
//# sourceMappingURL=quiz.model.js.map