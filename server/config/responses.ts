import { Response } from 'express';

export const validRes = (
    res: Response,
    data: unknown,
    message: string
): Response => {
    return res.send(200).json({ status: 'success', data, message });
};

export const invalidRes = (
    res: Response,
    data: unknown,
    message: string
): Response => {
    return res.send(500).json({ status: 'fail', data, message });
};
