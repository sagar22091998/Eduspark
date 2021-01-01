"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    instructorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    avgRatings: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true
});
const Course = mongoose_1.model("Course", courseSchema);
exports.default = Course;
//# sourceMappingURL=course.js.map