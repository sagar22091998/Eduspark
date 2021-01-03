import { Request } from 'express';
import RequestUser from '../interfaces/request.interface';

export default function assertIRequest(
    req: Request | RequestUser
): asserts req is RequestUser {
    if (!req) throw new Error('Request was not an RequestUser');
}
