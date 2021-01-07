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
const controllers = __importStar(require("../controllers/profile.controller"));
const response_helper_1 = require("../helpers/response.helper");
const auth_middleware_1 = require("../middleware/auth.middleware");
const request_helper_1 = __importDefault(require("../helpers/request.helper"));
const router = express_1.Router();
const registerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield controllers.register(req.body.name, req.body.email, req.body.password, req.body.mobileNumber);
        return response_helper_1.CREATE(res, response, 'Registration Successful');
    }
    catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            if (Object.keys(error.keyPattern)[0] === 'email') {
                error.message = 'Email must be unique';
            }
            else if (Object.keys(error.keyPattern)[0] === 'mobileNumber') {
                error.message = 'Mobile Number must be unique';
            }
        }
        return response_helper_1.BAD_REQUEST(res, error.message);
    }
});
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield controllers.login(req.body.email, req.body.password);
        return response_helper_1.SUCCESS(res, response, 'Successfully Logged In');
    }
    catch (error) {
        return response_helper_1.BAD_REQUEST(res, error.message);
    }
});
const logoutHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return response_helper_1.SUCCESS(res, 'Logout', 'Successfully Logged Out');
    }
    catch (error) {
        return response_helper_1.BAD_REQUEST(res, error);
    }
});
const profileHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        return response_helper_1.SUCCESS(res, req.profile, 'Sent Profile Details');
    }
    catch (error) {
        return response_helper_1.BAD_REQUEST(res, error);
    }
});
const updateHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'mobileNumber'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidOperation) {
            throw new Error('Invalid Updates');
        }
        updates.forEach(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (update) => (req.profile[update] = req.body[update]));
        yield req.profile.save();
        return response_helper_1.SUCCESS(res, req.profile, 'Details Updated');
    }
    catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            if (Object.keys(error.keyPattern)[0] === 'email') {
                error.message = 'Email must be unique';
            }
            else if (Object.keys(error.keyPattern)[0] === 'mobileNumber') {
                error.message = 'Mobile Number must be unique';
            }
        }
        return response_helper_1.BAD_REQUEST(res, error.message);
    }
});
const changePasswordHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.changePassword(req.profile, req.body.oldPassword, req.body.newPassword);
        return response_helper_1.SUCCESS(res, response, 'Details Updated');
    }
    catch (err) {
        return response_helper_1.BAD_REQUEST(res, err.message);
    }
});
const deleteHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const response = yield controllers.deleteUser(req.profile);
        return response_helper_1.SUCCESS(res, response, 'Account Deleted');
    }
    catch (err) {
        return response_helper_1.INTERNAL_ERROR(res, err);
    }
});
router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/logout', [auth_middleware_1.verifyToken, auth_middleware_1.verifyUser], logoutHandler);
router.get('/me', [auth_middleware_1.verifyToken, auth_middleware_1.verifyUser], profileHandler);
router.put('/update', [auth_middleware_1.verifyToken, auth_middleware_1.verifyUser], updateHandler);
router.put('/change-password', [auth_middleware_1.verifyToken, auth_middleware_1.verifyUser], changePasswordHandler);
router.delete('/delete', [auth_middleware_1.verifyToken, auth_middleware_1.verifyUser], deleteHandler);
exports.default = router;
//# sourceMappingURL=profile.routes.js.map