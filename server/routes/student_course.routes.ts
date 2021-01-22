import { Request, Response, Router } from 'express';
import * as controllers from '../controllers/student_course.controller';
import { BAD_REQUEST, CREATE, SUCCESS } from '../helpers/response.helper';
import { verifyToken } from '../middleware/auth.middleware';
import assertIRequest from '../helpers/request.helper';
import IEnroll from '../interfaces/enroll.interface';
import { IPaymentInitiate } from '../interfaces/response.interface';

const purchaseHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response: IEnroll = await controllers.purchaseCourse(
            req.userId,
            req.body.courseId
        );
        return CREATE(res, response, 'Course added successfully');
    } catch (err) {
        return BAD_REQUEST(res, err.message);
    }
};

const initiatePaymentHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response: IPaymentInitiate = await controllers.initiatePayment(
            req.userId,
            req.body.courseId
        );
        return SUCCESS(res, response, 'Payment Initiated');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
    }
};

const verifyHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response: string = await controllers.verification(
            req.body.payload.payment.entity.order_id
        );
        return SUCCESS(res, response, 'Verified Successfully');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
    }
};

const subscribedHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response: IEnroll[] = await controllers.purchasedCourses(
            req.userId
        );
        return SUCCESS(res, response, 'Viewed purchased courses');
    } catch (err) {
        return BAD_REQUEST(res, err.message);
    }
};

const progressHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response = await controllers.getProgress(
            req.userId,
            req.params.courseId
        );
        return SUCCESS(res, response, 'Course progress shown');
    } catch (err) {
        return BAD_REQUEST(res, err.message);
    }
};

const updateHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response = await controllers.updateProgress(
            req.userId,
            req.params.courseId,
            req.body.videoProgress
        );
        return SUCCESS(res, response, 'Course progress updated');
    } catch (err) {
        return BAD_REQUEST(res, err.message);
    }
};

const router: Router = Router();

router.get('/subscribed', verifyToken, subscribedHandler);
router.post('/purchase', verifyToken, purchaseHandler);
router.post('/initiate', verifyToken, initiatePaymentHandler);
router.post('/verification', verifyHandler);
router.get('/progress/:courseId', verifyToken, progressHandler);
router.put('/progress/:courseId', verifyToken, updateHandler);

export default router;
