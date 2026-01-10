"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPasswordValidation = void 0;
const express_validator_1 = require("express-validator");
exports.newPasswordValidation = (0, express_validator_1.body)("newPassword")
    .isString()
    .withMessage("password is not correct")
    .notEmpty()
    .withMessage('password should not be empty')
    .isLength({ min: 6, max: 20 })
    .withMessage("password length is not correct");
