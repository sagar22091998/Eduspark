"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enrollSchema = new mongoose_1.Schema({
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    },
    videoCompleted: {
        type: Number,
        required: true,
        default: 0
    },
    videoProgress: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});
enrollSchema.methods.toJSON = function () {
    const enroll = this;
    const enrollObj = enroll.toObject();
    delete enrollObj._id;
    delete enrollObj.studentId;
    return enrollObj;
};
const Enroll = mongoose_1.model('Enroll', enrollSchema);
exports.default = Enroll;
//# sourceMappingURL=enroll.model.js.map