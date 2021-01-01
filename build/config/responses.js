"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidRes = exports.validRes = void 0;
const validRes = (res, data, message) => {
    return res.send(200).json({ status: 'success', data, message });
};
exports.validRes = validRes;
const invalidRes = (res, data, message) => {
    return res.send(500).json({ status: 'fail', data, message });
};
exports.invalidRes = invalidRes;
//# sourceMappingURL=responses.js.map