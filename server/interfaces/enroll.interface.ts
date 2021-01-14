import { Document, Types } from 'mongoose';

export default interface IEnroll extends Document {
    studentId?: Types.ObjectId;
    courseId?: Types.ObjectId;
    paymentType: string;
    paymentStatus: string;
    orderId: string;
    paymentTxn: string;
    videoCompleted: number;
    videoProgress: number;
    createdAt: Date;
    updatedAt: Date;
}
