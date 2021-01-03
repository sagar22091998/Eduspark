"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTERNAL_ERROR = exports.NOT_FOUND = exports.FORBIDDEN = exports.UNAUTHORIZED = exports.BAD_REQUEST = exports.CREATE = exports.SUCCESS = void 0;
const SUCCESS = (res, data, message) => {
    return res.status(200).json({ status: 'success', data, message });
};
exports.SUCCESS = SUCCESS;
const CREATE = (res, data, message) => {
    return res.status(201).json({ status: 'success', data, message });
};
exports.CREATE = CREATE;
const BAD_REQUEST = (res, data) => {
    return res
        .status(400)
        .json({ status: 'fail', data, message: 'Bad Request' });
};
exports.BAD_REQUEST = BAD_REQUEST;
const UNAUTHORIZED = (res, data) => {
    return res
        .status(401)
        .json({ status: 'fail', data, message: 'Unauthorized' });
};
exports.UNAUTHORIZED = UNAUTHORIZED;
const FORBIDDEN = (res, data) => {
    return res.status(403).json({ status: 'fail', data, message: 'Forbidden' });
};
exports.FORBIDDEN = FORBIDDEN;
const NOT_FOUND = (res, data) => {
    return res.status(404).json({ status: 'fail', data, message: 'Not Found' });
};
exports.NOT_FOUND = NOT_FOUND;
const INTERNAL_ERROR = (res, data) => {
    return res
        .status(500)
        .json({ status: 'fail', data, message: 'Internal Server Error' });
};
exports.INTERNAL_ERROR = INTERNAL_ERROR;
//# sourceMappingURL=response.helper.js.map