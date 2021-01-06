import { Router, Request, Response } from 'express';
import * as controllers from '../controllers/instructor.courses.controller';
import { verifyToken } from '../middleware/auth.middleware';
import assertIRequest from '../helpers/request.helper';
import {
    BAD_REQUEST,
    CREATE,
    SUCCESS,
    INTERNAL_ERROR
} from '../helpers/response.helper';

const router: Router = Router();

const createHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response = await controllers.create(
            req.body.name,
            req.body.description,
            req.body.price,
            req.userId
        );
        return CREATE(res, response, 'Created Course Successfully');
    } catch (err) {
        return BAD_REQUEST(res, err.message);
    }
};

const getAllHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response = await controllers.getAll(req.userId);
        return SUCCESS(res, response, 'Instructor Courses Sent');
    } catch (err) {
        return BAD_REQUEST(res, err.message);
    }
};

const getDetailsHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response = await controllers.getDetails(
            req.userId,
            req.params.id
        );
        return SUCCESS(res, response, 'Course Details viewed');
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
        const response = await controllers.update(
            req.userId,
            req.params.id,
            req.body.name,
            req.body.description,
            req.body.price
        );
        return SUCCESS(res, response, 'Details Updated Successfully');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
    }
};

const deleteHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response = await controllers.deleteCourse(
            req.userId,
            req.params.id
        );
        return SUCCESS(res, response, 'Deleted Course Successfully');
    } catch (error) {
        return INTERNAL_ERROR(res, error.message);
    }
};

router.post('/create', [verifyToken], createHandler);
router.get('/list', [verifyToken], getAllHandler);
router.get('/details/:id', [verifyToken], getDetailsHandler);
router.put('/update/:id', [verifyToken], updateHandler);
router.delete('/delete/:id', [verifyToken], deleteHandler);

export default router;
