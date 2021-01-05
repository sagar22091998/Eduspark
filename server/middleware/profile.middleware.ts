import { Request, Response, NextFunction } from 'express';
import assertIRequest from '../helpers/request.helper';
import { FORBIDDEN } from '../helpers/response.helper';

export const verifyInstructor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<unknown> => {
    try {
        assertIRequest(req);
        if (req.type !== 1) throw new Error('Not An Instructor');
        next();
    } catch (err) {
        return FORBIDDEN(res, err.message);
    }
};
