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
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const course_model_1 = __importDefault(require("./course.model"));
const enroll_model_1 = __importDefault(require("./enroll.model"));
const score_model_1 = __importDefault(require("./score.model"));
const profileSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new mongoose_1.Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new mongoose_1.Error('Password cannot contain "password"');
            }
        }
    },
    mobileNumber: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    }
}, {
    timestamps: true,
    versionKey: false
});
profileSchema.methods.toJSON = function () {
    const profile = this;
    const profileObject = profile.toObject();
    delete profileObject.password;
    delete profileObject._id;
    return profileObject;
};
profileSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const secret = process.env.JWT_SECRET;
        const _id = user._id.toString();
        const payload = { _id };
        const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
        });
        return token;
    });
};
profileSchema.statics.findByCredentials = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const profile = yield Profile.findOne({ email });
        if (!profile) {
            throw new mongoose_1.Error('Unable to Login');
        }
        const isMatch = yield bcrypt.compare(password, profile.password);
        if (!isMatch) {
            throw new mongoose_1.Error('Unable to Login');
        }
        return profile;
    });
};
profileSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password')) {
            user.password = yield bcrypt.hashSync(user.password, 8);
        }
        next();
    });
});
profileSchema.pre('remove' || 'deleteOne', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield course_model_1.default.find({ instructorId: this._id });
        yield Promise.all(courses.map((element) => __awaiter(this, void 0, void 0, function* () {
            yield element.remove();
        })));
        yield enroll_model_1.default.deleteMany({ studentId: this._id });
        yield score_model_1.default.deleteMany({ studentId: this._id });
        next();
    });
});
const Profile = mongoose_1.model('Profile', profileSchema);
exports.default = Profile;
//# sourceMappingURL=profile.model.js.map