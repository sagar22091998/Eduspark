"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
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
    amount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        trim: true
    },
    orderId: {
        type: String,
        trim: true
    },
    receipt: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});
paymentSchema.methods.toJSON = () => {
    const payment = this;
    const paymentObj = payment.toObject();
    delete paymentObj._id;
    delete paymentObj.studentId;
    delete paymentObj.courseId;
    return paymentObj;
};
const Payment = mongoose_1.model('Payment', paymentSchema);
exports.default = Payment;
//# sourceMappingURL=payment.model.js.map