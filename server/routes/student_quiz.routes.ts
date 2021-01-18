import { Request, Response, Router } from 'express';
import * as controllers from '../controllers/student_quiz.controller';
import { BAD_REQUEST, SUCCESS } from '../helpers/response.helper';
import { verifyToken } from '../middleware/auth.middleware';
import assertIRequest from '../helpers/request.helper';
import {
    ILeaderboard,
    IQuizList,
    IStartQuiz
} from '../interfaces/response.interface';
import IScore from '../interfaces/score.interface';

const startHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        assertIRequest(req);
        const response: IStartQuiz = await controllers.startQuiz(
            req.params.courseId,
            req.userId,
            parseInt(req.query.quiz!.toString())
        );
        return SUCCESS(res, response, 'Quiz started successfully');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
    }
};

const endHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        assertIRequest(req);
        const response: IScore = await controllers.endQuiz(
            req.params.courseId,
            req.userId,
            parseInt(req.query.quiz!.toString()),
            req.body.answers
        );
        return SUCCESS(res, response, 'Answers submitted successfully');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
    }
};

const listHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        assertIRequest(req);
        const response: IQuizList[] = await controllers.listAll(
            req.userId,
            req.params.courseId
        );
        return SUCCESS(res, response, 'List of quizzes shown');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
    }
};

const leaderboardHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response: ILeaderboard = await controllers.leaderboard(
            req.userId,
            req.params.courseId,
            parseInt(req.query.quiz!.toString())
        );
        return SUCCESS(res, response, 'Viewed Leaderboard');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
    }
};

const router: Router = Router();

router.get('/start/:courseId', verifyToken, startHandler);
router.post('/end/:courseId', verifyToken, endHandler);
router.get('/list/:courseId', verifyToken, listHandler);
router.get('/leaderboard/:courseId', verifyToken, leaderboardHandler);

export default router;
