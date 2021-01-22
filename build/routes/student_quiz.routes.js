"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express");
const controllers = __importStar(require("../controllers/student_quiz.controller"));
const response_helper_1 = require("../helpers/response.helper");
const auth_middleware_1 = require("../middleware/auth.middleware");
const request_helper_1 = __importDefault(require("../helpers/request.helper"));
const startHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.startQuiz(req.params.courseId, req.userId, parseInt(req.query.quiz.toString()));
        return response_helper_1.SUCCESS(res, response, 'Quiz started successfully');
    }
    catch (error) {
        return response_helper_1.BAD_REQUEST(res, error.message);
    }
});
const endHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.endQuiz(req.params.courseId, req.userId, parseInt(req.query.quiz.toString()), req.body.answers);
        return response_helper_1.SUCCESS(res, response, 'Answers submitted successfully');
    }
    catch (error) {
        return response_helper_1.BAD_REQUEST(res, error.message);
    }
});
const listHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.listAll(req.userId, req.params.courseId);
        return response_helper_1.SUCCESS(res, response, 'List of quizzes shown');
    }
    catch (error) {
        return response_helper_1.BAD_REQUEST(res, error.message);
    }
});
const leaderboardHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.leaderboard(req.userId, req.params.courseId, parseInt(req.query.quiz.toString()));
        return response_helper_1.SUCCESS(res, response, 'Viewed Leaderboard');
    }
    catch (error) {
        return response_helper_1.BAD_REQUEST(res, error.message);
    }
});
const router = express_1.Router();
router.get('/start/:courseId', auth_middleware_1.verifyToken, startHandler);
router.post('/end/:courseId', auth_middleware_1.verifyToken, endHandler);
router.get('/list/:courseId', auth_middleware_1.verifyToken, listHandler);
router.get('/leaderboard/:courseId', auth_middleware_1.verifyToken, leaderboardHandler);
exports.default = router;
//# sourceMappingURL=student_quiz.routes.js.map