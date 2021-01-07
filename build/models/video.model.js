"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const videoSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    topic: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    videoURL: {
        type: String,
        trim: true,
        required: true
    },
    videoNumber: {
        type: Number,
        required: true
    },
    quizNext: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});
const Video = mongoose_1.model('Video', videoSchema);
exports.default = Video;
//# sourceMappingURL=video.model.js.map