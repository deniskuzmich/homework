"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_user_handler_1 = require("../auth/auth-user/handler/auth-user.handler");
const auth_middleware_1 = require("../auth/middleware/auth.middleware");
const auth_me_handler_1 = require("../auth/auth-user/handler/auth-me-handler");
const user_registration_handler_1 = require("../auth/auth-user/handler/user-registration.handler");
const registration_confirm_1 = require("../auth/auth-user/handler/registration-confirm");
const email_resending_1 = require("../auth/auth-user/handler/email-resending");
const input_validation_result_middleware_1 = require("../common/middleware-validation/input.validation-result.middleware");
const auth_validation_1 = require("../auth/middleware/auth-validation");
const refresh_token_handler_1 = require("../auth/auth-user/handler/refresh-token.handler");
const logout_handler_1 = require("../auth/auth-user/handler/logout.handler");
const request_log_middleware_1 = require("../devices/middleware/request-log-middleware");
const request_count_middleware_1 = require("../devices/middleware/request-count-middleware");
exports.authRouter = (0, express_1.Router)()
    .post('/login', request_count_middleware_1.requestCountMiddleware, request_log_middleware_1.requestLoggerMiddleware, auth_user_handler_1.authUserHandler)
    .post('/refresh-token', refresh_token_handler_1.authRefreshTokenHandler)
    .post('/logout', logout_handler_1.logoutHandler)
    .post('/registration', request_count_middleware_1.requestCountMiddleware, request_log_middleware_1.requestLoggerMiddleware, auth_validation_1.authInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, user_registration_handler_1.userRegistrationHandler)
    .post('/registration-confirmation', request_count_middleware_1.requestCountMiddleware, request_log_middleware_1.requestLoggerMiddleware, input_validation_result_middleware_1.inputValidationResultMiddleware, registration_confirm_1.registrationConfirmHandler)
    .post('/registration-email-resending', request_count_middleware_1.requestCountMiddleware, request_log_middleware_1.requestLoggerMiddleware, input_validation_result_middleware_1.inputValidationResultMiddleware, email_resending_1.emailResendingHandler)
    .get('/me', auth_middleware_1.authMiddleware, auth_me_handler_1.aboutMeHandler);
