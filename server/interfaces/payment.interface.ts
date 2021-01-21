import { Document, Types } from 'mongoose';

export default interface IPayment extends Document {
    studentId?: Types.ObjectId;
    courseId?: Types.ObjectId;
    amount: number;
    paymentStatus: string;
    orderId: string;
    receipt: string;
}
