"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function assertIRequest(req) {
    if (!req)
        throw new Error('Request was not an RequestUser');
}
exports.default = assertIRequest;
//# sourceMappingURL=request.helper.js.map