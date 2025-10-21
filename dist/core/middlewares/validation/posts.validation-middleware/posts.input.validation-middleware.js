"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInputValidation = void 0;
const express_validator_1 = require("express-validator");
const titleValidation = (0, express_validator_1.body)('title')
    .isString()
    .withMessage('title is not correct')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('title length is not correct');
const shortDescriptionValidation = (0, express_validator_1.body)('shortDescription')
    .isString()
    .withMessage('shortDescription is not correct')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('shortDescription length is not correct');
const contentValidation = (0, express_validator_1.body)('content')
    .isString()
    .withMessage('content is not correct')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('content length is not correct');
const blogerIdValidation = (0, express_validator_1.body)('blogerId')
    .exists()
    .withMessage('blogerId is required')
    .isString()
    .withMessage('blogerId must be a string')
    .trim();
exports.postInputValidation = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation, ,
    blogerIdValidation
];
