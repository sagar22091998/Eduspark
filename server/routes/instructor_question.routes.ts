import { Router, Request, Response } from 'express';
import * as controllers from '../controllers/instructor_question.controller';
import { verifyToken } from '../middleware/auth.middleware';
import assertIRequest from '../helpers/request.helper';
import {
    BAD_REQUEST,
    CREATE,
    SUCCESS,
    INTERNAL_ERROR
} from '../helpers/response.helper';
import IQuestion from '../interfaces/question.interface';

const createHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response: IQuestion = await controllers.create(
            req.userId,
            req.params.courseId,
            parseInt(req.query.quiz!.toString()),
            req.body.question,
            req.body.option1,
            req.body.option2,
            req.body.option3,
            req.body.option4,
            req.body.correctAnswer
        );
        return CREATE(res, response, 'Question added successfully');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
    }
};

const listHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        assertIRequest(req);
        const response: IQuestion[] = await controllers.viewAll(
            req.userId,
            req.params.courseId,
            parseInt(req.query.quiz!.toString())
        );
        return SUCCESS(res, response, 'List of questions shown');
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
        const response: IQuestion = await controllers.update(
            req.userId,
            req.params.courseId,
            parseInt(req.query.quiz!.toString()),
            parseInt(req.query.question!.toString()),
            req.body.question,
            req.body.option1,
            req.body.option2,
            req.body.option3,
            req.body.option4,
            req.body.correctAnswer
        );
        return SUCCESS(res, response, 'Details updated successfully');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
    }
};

const shiftHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        assertIRequest(req);
        const response: IQuestion[] = await controllers.shift(
            req.userId,
            req.params.courseId,
            parseInt(req.query.quiz!.toString()),
            req.body.firstQuestion,
            req.body.secondQuestion
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
        const response: IQuestion = await controllers.deleteQuestion(
            req.userId,
            req.params.courseId,
            parseInt(req.query.quiz!.toString()),
            parseInt(req.query.quiz!.toString())
        );
        return SUCCESS(res, response, 'Question deleted successfully');
    } catch (error) {
        return INTERNAL_ERROR(res, error.message);
    }
};

const router: Router = Router();

router.post('/create/:courseId', verifyToken, createHandler);
router.get('/list/:courseId', verifyToken, listHandler);
router.put('/update/:courseId', verifyToken, updateHandler);
router.put('/shift/:courseId', verifyToken, shiftHandler);
router.delete('/delete/:courseId', verifyToken, deleteHandler);

export default router;
