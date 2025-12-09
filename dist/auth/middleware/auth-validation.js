"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authInputValidation = exports.passwordValidation = exports.emailValidation = exports.loginValidation = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidation = (0, express_validator_1.body)("login")
    .isString()
    .withMessage("login is not correct")
    .notEmpty()
    .withMessage('login should not be empty')
    .isLength({ min: 3, max: 10 })
    .withMessage("login length is not correct")
    .matches(`^[a-zA-Z0-9_-]*$`);
exports.emailValidation = (0, express_validator_1.body)("email")
    .isString()
    .withMessage("email is not correct")
    .notEmpty()
    .withMessage('email should not be empty')
    .matches(`^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$`);
exports.passwordValidation = (0, express_validator_1.body)("password")
    .isString()
    .withMessage("password is not correct")
    .notEmpty()
    .withMessage('password should not be empty')
    .isLength({ min: 6, max: 20 })
    .withMessage("password length is not correct");
exports.authInputValidation = [
    exports.loginValidation,
    exports.emailValidation,
    exports.passwordValidation
];
