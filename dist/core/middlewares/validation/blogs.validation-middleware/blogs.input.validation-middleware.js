"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsInputValidation = void 0;
const express_validator_1 = require("express-validator");
const nameValidation = (0, express_validator_1.body)('name')
    .isString()
    .withMessage('name is not correct')
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage('name length is not correct');
const descriptionValidation = (0, express_validator_1.body)('description')
    .isString()
    .withMessage('description is not correct')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('description length is not correct');
const websiteUrlValidation = (0, express_validator_1.body)('websiteUrl')
    .isString()
    .withMessage('websiteUrl is not correct')
    .isLength({ min: 1, max: 100 })
    .withMessage('websiteUrl length is not correct')
    .matches(`^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$`)
    .withMessage('websiteUrl address is not correct');
exports.blogsInputValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
];
