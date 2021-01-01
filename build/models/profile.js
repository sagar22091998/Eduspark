"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const profileSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        trim: true,
        required: true,
        minlength: 10,
    },
    profileType: {
        type: Boolean,
        required: true,
        default: 0,
    }
}, {
    timestamps: true
});
const Profile = mongoose_1.model("Profile", profileSchema);
exports.default = Profile;
//# sourceMappingURL=profile.js.map