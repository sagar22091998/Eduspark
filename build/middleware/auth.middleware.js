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
exports.verifyUser = exports.verifyToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const response_helper_1 = require("../helpers/response.helper");
const profile_model_1 = __importDefault(require("../models/profile.model"));
const request_helper_1 = __importDefault(require("../helpers/request.helper"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        if (!decoded)
            throw new Error('Token Expired');
        const _id = decoded._id;
        request_helper_1.default(req);
        req.userId = _id;
        next();
    }
    catch (err) {
        console.log(err);
        return response_helper_1.UNAUTHORIZED(res, err.message);
    }
});
exports.verifyToken = verifyToken;
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        const profile = yield profile_model_1.default.findOne({ _id: req.userId });
        if (!profile)
            throw new Error('User not found');
        req.profile = profile;
        next();
    }
    catch (err) {
        return response_helper_1.NOT_FOUND(res, err.message);
    }
});
exports.verifyUser = verifyUser;
//# sourceMappingURL=auth.middleware.js.map