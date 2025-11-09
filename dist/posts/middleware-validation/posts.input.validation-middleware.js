"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInputValidation = exports.blogIdValidation = exports.contentValidation = exports.shortDescriptionValidation = exports.titleValidation = void 0;
const express_validator_1 = require("express-validator");
exports.titleValidation = (0, express_validator_1.body)("title")
    .isString()
    .withMessage("title is not correct")
    .trim()
    .notEmpty()
    .withMessage('Title should not be empty')
    .isLength({ min: 1, max: 30 })
    .withMessage("title length is not correct");
exports.shortDescriptionValidation = (0, express_validator_1.body)("shortDescription")
    .isString()
    .withMessage("shortDescription is not correct")
    .trim()
    .notEmpty()
    .withMessage('shortDescription should not be empty')
    .isLength({ min: 1, max: 100 })
    .withMessage("shortDescription length is not correct");
exports.contentValidation = (0, express_validator_1.body)("content")
    .isString()
    .withMessage("content is not correct")
    .trim()
    .notEmpty()
    .withMessage('content should not be empty')
    .isLength({ min: 1, max: 1000 })
    .withMessage("content length is not correct");
exports.blogIdValidation = (0, express_validator_1.body)("blogId")
    .exists()
    .withMessage("blogId is required")
    .trim()
    .isString()
    .withMessage("blogId must be a string")
    .isMongoId()
    .withMessage('blogId should be MongoId type');
exports.postInputValidation = [
    exports.titleValidation,
    exports.shortDescriptionValidation,
    exports.contentValidation,
    exports.blogIdValidation,
];
