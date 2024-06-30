"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
    const statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = err.message || "Something went wrong, try again later";
    res.status(statusCode).json({ msg });
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map