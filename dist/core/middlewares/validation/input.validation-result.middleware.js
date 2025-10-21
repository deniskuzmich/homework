"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationResultMiddleware = exports.createErrorMessages = void 0;
const express_validator_1 = require("express-validator");
const http_statuses_1 = require("../../../http_statuses/http_statuses");
const createErrorMessages = (errors) => {
    return { errorsMessages: errors };
};
exports.createErrorMessages = createErrorMessages;
const formatErrors = (error) => {
    const expressError = error;
    return {
        field: expressError.path,
        message: expressError.msg,
    };
};
const inputValidationResultMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).formatWith(formatErrors).array({ onlyFirstError: true });
    if (errors.length) {
        return res.status(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400).json({ errorsMessages: errors });
    }
    next();
};
exports.inputValidationResultMiddleware = inputValidationResultMiddleware;
