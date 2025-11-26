"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentInputValidation = exports.contentValidation = void 0;
const express_validator_1 = require("express-validator");
exports.contentValidation = (0, express_validator_1.body)("content")
    .isString()
    .withMessage("content is not correct")
    .notEmpty()
    .withMessage('content should not be empty')
    .isLength({ min: 20, max: 1000 })
    .withMessage("content length is not correct");
exports.commentInputValidation = [
    exports.contentValidation
];
