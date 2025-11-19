"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInputValidation = exports.emailValidation = exports.passwordValidation = exports.loginValidation = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidation = (0, express_validator_1.body)("login")
    .isString()
    .withMessage("login is not correct")
    .trim()
    .notEmpty()
    .withMessage('login should not be empty')
    .isLength({ min: 3, max: 10 })
    .withMessage("login length is not correct")
    .matches('^[a-zA-Z0-9_-]*$');
exports.passwordValidation = (0, express_validator_1.body)("password")
    .isString()
    .withMessage("password is not correct")
    .notEmpty()
    .withMessage('password should not be empty')
    .isLength({ min: 6, max: 20 })
    .withMessage("password length is not correct");
exports.emailValidation = (0, express_validator_1.body)("email")
    .isString()
    .withMessage("email is not correct")
    .trim()
    .notEmpty()
    .withMessage('email should not be empty')
    .isLength({ min: 6, max: 20 })
    .withMessage("email length is not correct")
    .isEmail()
    .withMessage("email length is not correct");
exports.userInputValidation = [
    exports.loginValidation,
    exports.passwordValidation,
    exports.emailValidation,
];
