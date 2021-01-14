import { Request, Response, Router } from 'express';
import * as controllers from '../controllers/student_course.controller';
import { BAD_REQUEST, CREATE, SUCCESS } from '../helpers/response.helper';
import { verifyToken } from '../middleware/auth.middleware';
import assertIRequest from '../helpers/request.helper';
import IEnroll from '../interfaces/enroll.interface';

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
router.get('/progress/:courseId', verifyToken, progressHandler);
router.put('/progress/:courseId', verifyToken, updateHandler);

export default router;
