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
const controllers = __importStar(require("../controllers/instructor.courses.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const profile_middleware_1 = require("../middleware/profile.middleware");
const request_helper_1 = __importDefault(require("../helpers/request.helper"));
const response_helper_1 = require("../helpers/response.helper");
const router = express_1.Router();
const createHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.create(req.body.name, req.body.description, req.body.price, req.userId);
        return response_helper_1.CREATE(res, response, 'Created Course Successfully');
    }
    catch (err) {
        return response_helper_1.BAD_REQUEST(res, err.message);
    }
});
const getAllHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.getAll(req.userId);
        return response_helper_1.SUCCESS(res, response, 'Instructor Courses Sent');
    }
    catch (err) {
        return response_helper_1.BAD_REQUEST(res, err.message);
    }
});
const getDetailsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.getDetails(req.userId, req.params.id);
        return response_helper_1.SUCCESS(res, response, 'Course Details viewed');
    }
    catch (err) {
        return response_helper_1.BAD_REQUEST(res, err.message);
    }
});
const updateHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.update(req.userId, req.params.id, req.body.name, req.body.description, req.body.price);
        return response_helper_1.SUCCESS(res, response, 'Details Updated Successfully');
    }
    catch (error) {
        return response_helper_1.BAD_REQUEST(res, error.message);
    }
});
const deleteHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.deleteCourse(req.userId, req.params.id);
        return response_helper_1.SUCCESS(res, response, 'Deleted Course Successfully');
    }
    catch (error) {
        return response_helper_1.INTERNAL_ERROR(res, error.message);
    }
});
router.post('/create', [auth_middleware_1.verifyToken, profile_middleware_1.verifyInstructor], createHandler);
router.get('/list', [auth_middleware_1.verifyToken, profile_middleware_1.verifyInstructor], getAllHandler);
router.get('/details/:id', [auth_middleware_1.verifyToken, profile_middleware_1.verifyInstructor], getDetailsHandler);
router.put('/update/:id', [auth_middleware_1.verifyToken, profile_middleware_1.verifyInstructor], updateHandler);
router.delete('/delete/:id', [auth_middleware_1.verifyToken, profile_middleware_1.verifyInstructor], deleteHandler);
exports.default = router;
//# sourceMappingURL=instructor.courses.routes.js.map