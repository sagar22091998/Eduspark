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
const controllers = __importStar(require("../controllers/public_course.controllers"));
const response_helper_1 = require("../helpers/response.helper");
const auth_middleware_1 = require("../middleware/auth.middleware");
const request_helper_1 = __importDefault(require("../helpers/request.helper"));
const listHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page.toString()) || 0;
        const response = yield controllers.viewAll(page);
        return response_helper_1.SUCCESS(res, response, 'Courses list shown');
    }
    catch (err) {
        return response_helper_1.BAD_REQUEST(res, err.message);
    }
});
const loggedInListHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const page = parseInt(req.query.page.toString()) || 0;
        const response = yield controllers.loginViewAll(page, req.userId);
        return response_helper_1.SUCCESS(res, response, 'Course details shown');
    }
    catch (err) {
        return response_helper_1.BAD_REQUEST(res, err.message);
    }
});
const loginDetailsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.loggedInDetails(req.params.courseId, req.userId);
        return response_helper_1.SUCCESS(res, response, 'Course details shown');
    }
    catch (error) {
        return response_helper_1.BAD_REQUEST(res, error.message);
    }
});
const detailsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield controllers.details(req.params.courseId);
        return response_helper_1.SUCCESS(res, response, 'Course details shown');
    }
    catch (err) {
        return response_helper_1.BAD_REQUEST(res, err.message);
    }
});
const router = express_1.Router();
router.get('/list', listHandler);
router.get('/login-list', auth_middleware_1.verifyToken, loggedInListHandler);
router.get('/login-details/:courseId', auth_middleware_1.verifyToken, loginDetailsHandler);
router.get('/details/:courseId', detailsHandler);
exports.default = router;
//# sourceMappingURL=public_courses.routes.js.map