import { Schema, model, Model } from 'mongoose';
import IPayment from '../interfaces/payment.interface';

const paymentSchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Profile'
        },
        courseId: {
            type: Schema.Types.ObjectId,
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
    },
    {
        timestamps: true,
        versionKey: false
    }
);

paymentSchema.methods.toJSON = () => {
    const payment: IPayment = this!;
    const paymentObj = payment.toObject();

    delete paymentObj._id;
    delete paymentObj.studentId;
    delete paymentObj.courseId;

    return paymentObj;
};

const Payment: Model<IPayment> = model<IPayment>('Payment', paymentSchema);
export default Payment;
