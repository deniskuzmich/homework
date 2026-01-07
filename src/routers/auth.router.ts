import {Router} from "express";
import {authMiddleware} from "../auth/middleware/auth.middleware";
import {inputValidationResultMiddleware} from "../common/middleware-validation/input.validation-result.middleware";
import {authInputValidation} from "../auth/middleware/auth-validation";
import {requestLoggerMiddleware} from "../devices/middleware/request-log-middleware";
import {requestCountMiddleware} from "../devices/middleware/request-count-middleware";
import {
  aboutMeHandler,
  authHandler,
  authRefreshTokenHandler, emailResendingHandler,
  logoutHandler, registrationConfirmHandler,
  userRegistrationHandler
} from "../core/composition/composition-root";

export const authRouter = Router()
  .post('/login', requestCountMiddleware, requestLoggerMiddleware, authHandler.login)
  .post('/refresh-token', authRefreshTokenHandler.refreshToken)
  .post('/logout', logoutHandler.logout)
  .post('/registration', requestCountMiddleware, requestLoggerMiddleware, authInputValidation, inputValidationResultMiddleware, userRegistrationHandler.registration)
  .post('/registration-confirmation', requestCountMiddleware, requestLoggerMiddleware, inputValidationResultMiddleware, registrationConfirmHandler.confirmation)
  .post('/registration-email-resending', requestCountMiddleware, requestLoggerMiddleware, inputValidationResultMiddleware, emailResendingHandler.resending)
  .get('/me', authMiddleware, aboutMeHandler.me)
