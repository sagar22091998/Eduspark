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
const controllers = __importStar(require("../controllers/student_course.controller"));
const response_helper_1 = require("../helpers/response.helper");
const auth_middleware_1 = require("../middleware/auth.middleware");
const request_helper_1 = __importDefault(require("../helpers/request.helper"));
const purchaseHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.purchaseCourse(req.userId, req.body.courseId);
        return response_helper_1.CREATE(res, response, 'Course added successfully');
    }
    catch (err) {
        return response_helper_1.BAD_REQUEST(res, err.message);
    }
});
const initiatePaymentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.initiatePayment(req.userId, req.body.courseId);
        return response_helper_1.SUCCESS(res, response, 'Payment Initiated');
    }
    catch (error) {
        return response_helper_1.BAD_REQUEST(res, error.message);
    }
});
const verifyHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.verification(req.body.payload.payment.entity.order_id);
        return response_helper_1.SUCCESS(res, response, 'Verified Successfully');
    }
    catch (error) {
        return response_helper_1.BAD_REQUEST(res, error.message);
    }
});
const subscribedHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.purchasedCourses(req.userId);
        return response_helper_1.SUCCESS(res, response, 'Viewed purchased courses');
    }
    catch (err) {
        return response_helper_1.BAD_REQUEST(res, err.message);
    }
});
const progressHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.getProgress(req.userId, req.params.courseId);
        return response_helper_1.SUCCESS(res, response, 'Course progress shown');
    }
    catch (err) {
        return response_helper_1.BAD_REQUEST(res, err.message);
    }
});
const updateHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.updateProgress(req.userId, req.params.courseId, req.body.videoProgress);
        return response_helper_1.SUCCESS(res, response, 'Course progress updated');
    }
    catch (err) {
        return response_helper_1.BAD_REQUEST(res, err.message);
    }
});
const router = express_1.Router();
router.get('/subscribed', auth_middleware_1.verifyToken, subscribedHandler);
router.post('/purchase', auth_middleware_1.verifyToken, purchaseHandler);
router.post('/initiate', auth_middleware_1.verifyToken, initiatePaymentHandler);
router.post('/verification', verifyHandler);
router.get('/progress/:courseId', auth_middleware_1.verifyToken, progressHandler);
router.put('/progress/:courseId', auth_middleware_1.verifyToken, updateHandler);
exports.default = router;
//# sourceMappingURL=student_course.routes.js.map