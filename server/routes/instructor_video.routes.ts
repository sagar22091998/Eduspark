import { Router, Request, Response } from 'express';
import * as controllers from '../controllers/instructor_video.controller';
import { verifyToken } from '../middleware/auth.middleware';
import assertIRequest from '../helpers/request.helper';
import {
    BAD_REQUEST,
    CREATE,
    SUCCESS,
    INTERNAL_ERROR
} from '../helpers/response.helper';

const createHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response = await controllers.addNew(
            req.userId,
            req.params.courseId,
            req.body.topic,
            req.body.description,
            req.body.publicId
        );
        return CREATE(res, response, 'Video details added');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
    }
};

const listHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        assertIRequest(req);
        const response = await controllers.getAll(
            req.userId,
            req.params.courseId
        );
        return SUCCESS(res, response, 'Videos in course shown');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
    }
};

const detailsHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response = await controllers.getDetails(
            req.userId,
            req.params.courseId,
            parseInt(req.query.number!.toString())
        );
        return SUCCESS(res, response, 'Video details viewed');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
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
            parseInt(req.query.number!.toString()),
            req.params.courseId,
            req.body.topic,
            req.body.description,
            req.body.publicId
        );
        return SUCCESS(res, response, 'Details updated successfully');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
    }
};

const shiftHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        assertIRequest(req);
        const response = await controllers.shift(
            req.userId,
            req.params.courseId,
            req.body.firstVideo,
            req.body.secondVideo
        );
        return SUCCESS(res, response, 'Order shifted successfully');
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
        const response = await controllers.deleteVideo(
            req.userId,
            req.params.courseId,
            parseInt(req.query.number!.toString())
        );
        return SUCCESS(res, response, 'Details deleted successfully');
    } catch (error) {
        return INTERNAL_ERROR(res, error.message);
    }
};

const router: Router = Router();

router.post('/add/:courseId', verifyToken, createHandler);
router.get('/list/:courseId', verifyToken, listHandler);
router.get('/details/:courseId', verifyToken, detailsHandler);
router.put('/update/:courseId', verifyToken, updateHandler);
router.put('/shift/:courseId', verifyToken, shiftHandler);
router.delete('/delete/:courseId', verifyToken, deleteHandler);

export default router;
