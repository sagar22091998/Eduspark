"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const scoreSchema = new mongoose_1.Schema({
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    quizId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Quiz'
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },
    startTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
const Score = mongoose_1.model('Score', scoreSchema);
exports.default = Score;
//# sourceMappingURL=score.model.js.map