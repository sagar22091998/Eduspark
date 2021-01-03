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
exports.deleteUser = exports.changePassword = exports.login = exports.register = void 0;
const bcryptjs_1 = require("bcryptjs");
const profile_model_1 = __importDefault(require("../models/profile.model"));
const register = (name, email, password, mobileNumber, profileType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = new profile_model_1.default({
            name,
            email,
            password,
            mobileNumber,
            profileType
        });
        yield profile.save();
        const token = yield profile.generateAuthToken();
        return { profile, token };
    }
    catch (err) {
        return err.message;
    }
});
exports.register = register;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield profile_model_1.default.findByCredentials(email, password);
        const token = yield profile.generateAuthToken();
        return { profile, token };
    }
    catch (err) {
        return err.message;
    }
});
exports.login = login;
const changePassword = (profile, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMatch = yield bcryptjs_1.compare(oldPassword, profile.password);
        if (!isMatch)
            throw new Error('Incorrect Password');
        profile.password = newPassword;
        yield profile.save();
        return 'Changed Password Successfully';
    }
    catch (err) {
        return err.message;
    }
});
exports.changePassword = changePassword;
const deleteUser = (profile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield profile.remove();
        return 'Removed the account';
    }
    catch (err) {
        return err.message;
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=profile.controller.js.map