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
exports.verifyInstructor = void 0;
const request_helper_1 = __importDefault(require("../helpers/request.helper"));
const response_helper_1 = require("../helpers/response.helper");
const verifyInstructor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        request_helper_1.default(req);
        if (req.type !== 1)
            throw new Error('Not An Instructor');
        next();
    }
    catch (err) {
        return response_helper_1.FORBIDDEN(res, err.message);
    }
});
exports.verifyInstructor = verifyInstructor;
//# sourceMappingURL=profile.middleware.js.map