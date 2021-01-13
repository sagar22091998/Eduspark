import { Request, Response, Router } from 'express';
import * as controllers from '../controllers/public_course.controllers';
import { BAD_REQUEST, SUCCESS } from '../helpers/response.helper';
import { verifyToken } from '../middleware/auth.middleware';
import assertIRequest from '../helpers/request.helper';
import ICourse from '../interfaces/course.interface';

const listHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const page: number = parseInt(req.query.page!.toString()) || 0;
        const response: ICourse[] = await controllers.viewAll(page);
        return SUCCESS(res, response, 'Courses list shown');
    } catch (err) {
        return BAD_REQUEST(res, err.message);
    }
};

const loginDetailsHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response = await controllers.loggedInDetails(
            req.params.courseId,
            req.userId
        );
        return SUCCESS(res, response, 'Course details shown');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
    }
};

const detailsHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const response = await controllers.details(req.params.courseId);
        return SUCCESS(res, response, 'Course details shown');
    } catch (err) {
        return BAD_REQUEST(res, err.message);
    }
};

const router: Router = Router();

router.get('/list', listHandler);
router.get('/login-details/:courseId', verifyToken, loginDetailsHandler);
router.get('/details/:courseId', detailsHandler);

export default router;
