"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../auth/middleware/auth.middleware");
const input_validation_result_middleware_1 = require("../common/middleware-validation/input.validation-result.middleware");
const auth_validation_1 = require("../auth/middleware/auth-validation");
const request_log_middleware_1 = require("../devices/middleware/request-log-middleware");
const request_count_middleware_1 = require("../devices/middleware/request-count-middleware");
const composition_root_1 = require("../core/composition/composition-root");
exports.authRouter = (0, express_1.Router)()
    .post('/login', request_count_middleware_1.requestCountMiddleware, request_log_middleware_1.requestLoggerMiddleware, composition_root_1.authHandler.login)
    .post('/refresh-token', composition_root_1.authRefreshTokenHandler.refreshToken)
    .post('/logout', composition_root_1.logoutHandler.logout)
    .post('/registration', request_count_middleware_1.requestCountMiddleware, request_log_middleware_1.requestLoggerMiddleware, auth_validation_1.authInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.userRegistrationHandler.registration)
    .post('/registration-confirmation', request_count_middleware_1.requestCountMiddleware, request_log_middleware_1.requestLoggerMiddleware, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.registrationConfirmHandler.confirmation)
    .post('/registration-email-resending', request_count_middleware_1.requestCountMiddleware, request_log_middleware_1.requestLoggerMiddleware, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.emailResendingHandler.resending)
    .post('/password-recovery', request_count_middleware_1.requestCountMiddleware, request_log_middleware_1.requestLoggerMiddleware, auth_validation_1.emailValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, composition_root_1.passwordRecoveryHandler.recovery)
    .post('/new-password', request_count_middleware_1.requestCountMiddleware, request_log_middleware_1.requestLoggerMiddleware, auth_validation_1.passwordValidation, composition_root_1.newPasswordHandler.newPassword)
    .get('/me', auth_middleware_1.authMiddleware, composition_root_1.aboutMeHandler.me);
