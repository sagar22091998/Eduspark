import { Request, Response, Router } from 'express';
import * as controllers from '../controllers/profile.controller';
import {
    BAD_REQUEST,
    CREATE,
    INTERNAL_ERROR,
    SUCCESS
} from '../helpers/response.helper';
import { verifyToken, verifyUser } from '../middleware/auth.middleware';
import assertIRequest from '../helpers/request.helper';

const router: Router = Router();

const registerHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const response = await controllers.register(
            req.body.name,
            req.body.email,
            req.body.password,
            req.body.mobileNumber
        );
        return CREATE(res, response, 'Registration Successful');
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            if (Object.keys(error.keyPattern)[0] === 'email') {
                error.message = 'Email already exits';
            } else if (Object.keys(error.keyPattern)[0] === 'mobileNumber') {
                error.message = 'Mobile Number already exits';
            }
        }
        return BAD_REQUEST(res, error.message);
    }
};

const loginHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = await controllers.login(
            req.body.email,
            req.body.password
        );
        return SUCCESS(res, response, 'Successfully Logged In');
    } catch (error) {
        return BAD_REQUEST(res, error.message);
    }
};

const logoutHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        return SUCCESS(res, 'Logout', 'Successfully Logged Out');
    } catch (error) {
        return BAD_REQUEST(res, error);
    }
};

const profileHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        return SUCCESS(res, req.profile, 'Sent Profile Details');
    } catch (error) {
        return BAD_REQUEST(res, error);
    }
};
const updateHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'mobileNumber'];
        const isValidOperation = updates.every((update) =>
            allowedUpdates.includes(update)
        );

        if (!isValidOperation) {
            throw new Error('Invalid Updates');
        }
        updates.forEach(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (update) => ((req.profile as any)[update] = req.body[update])
        );
        await req.profile.save();
        return SUCCESS(res, req.profile, 'Details Updated');
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            if (Object.keys(error.keyPattern)[0] === 'email') {
                error.message = 'Email already exits';
            } else if (Object.keys(error.keyPattern)[0] === 'mobileNumber') {
                error.message = 'Mobile Number already exits';
            }
        }
        return BAD_REQUEST(res, error.message);
    }
};

const changePasswordHandler = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        assertIRequest(req);
        const response = await controllers.changePassword(
            req.profile,
            req.body.oldPassword,
            req.body.newPassword
        );
        return SUCCESS(res, response, 'Details Updated');
    } catch (err) {
        return BAD_REQUEST(res, err.message);
    }
};

const deleteHandler = async (req: Request, res: Response) => {
    try {
        assertIRequest(req);
        const response = await controllers.deleteUser(req.profile);
        return SUCCESS(res, response, 'Account Deleted');
    } catch (err) {
        return INTERNAL_ERROR(res, err);
    }
};

router.post('/register', registerHandler);

router.post('/login', loginHandler);

router.post('/logout', [verifyToken, verifyUser], logoutHandler);

router.get('/me', [verifyToken, verifyUser], profileHandler);

router.put('/update', [verifyToken, verifyUser], updateHandler);

router.put(
    '/change-password',
    [verifyToken, verifyUser],
    changePasswordHandler
);

router.delete('/delete', [verifyToken, verifyUser], deleteHandler);

export default router;
