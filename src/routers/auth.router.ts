import {Router} from "express";
import {authMiddleware} from "../auth/middleware/auth.middleware";
import {inputValidationResultMiddleware} from "../common/middleware-validation/input.validation-result.middleware";
import {authInputValidation, emailValidation} from "../auth/middleware/auth-validation";
import {requestLoggerMiddleware} from "../devices/middleware/request-log-middleware";
import {requestCountMiddleware} from "../devices/middleware/request-count-middleware";
import {
  aboutMeHandler,
  authHandler,
  authRefreshTokenHandler, emailResendingHandler,
  logoutHandler, passwordRecovery, registrationConfirmHandler,
  userRegistrationHandler
} from "../core/composition/composition-root";

export const authRouter = Router()
  .post('/login', requestCountMiddleware, requestLoggerMiddleware, authHandler.login)
  .post('/refresh-token', authRefreshTokenHandler.refreshToken)
  .post('/logout', logoutHandler.logout)
  .post('/registration', requestCountMiddleware, requestLoggerMiddleware, authInputValidation, inputValidationResultMiddleware, userRegistrationHandler.registration)
  .post('/registration-confirmation', requestCountMiddleware, requestLoggerMiddleware, inputValidationResultMiddleware, registrationConfirmHandler.confirmation)
  .post('/registration-email-resending', requestCountMiddleware, requestLoggerMiddleware, inputValidationResultMiddleware, emailResendingHandler.resending)
  // .post('/password-recovery', requestCountMiddleware, requestLoggerMiddleware, emailValidation, inputValidationResultMiddleware, passwordRecovery.recover)
  // .post('/new-password',)
  .get('/me', authMiddleware, aboutMeHandler.me)
