import {Router} from "express";
import {authUserHandler} from "../auth/auth-user/handler/auth-user.handler";
import {authMiddleware} from "../auth/middleware/auth.middleware";
import {aboutMeHandler} from "../auth/auth-user/handler/auth-me-handler";
import {userRegistrationHandler} from "../auth/auth-user/handler/user-registration.handler";
import {registrationConfirmHandler} from "../auth/auth-user/handler/registration-confirm";
import {emailResendingHandler} from "../auth/auth-user/handler/email-resending";
import {inputValidationResultMiddleware} from "../common/middleware-validation/input.validation-result.middleware";
import {authInputValidation} from "../auth/middleware/auth-validation";
import {authRefreshTokenHandler} from "../auth/auth-user/handler/refresh-token.handler";
import {logoutHandler} from "../auth/auth-user/handler/logout.handler";
import {requestLoggerMiddleware} from "../devices/middleware/request-log-middleware";
import {requestCountMiddleware} from "../devices/middleware/request-count-middleware";

export const authRouter = Router()
  .post('/login', requestCountMiddleware, requestLoggerMiddleware, authUserHandler)
  .post('/refresh-token', authRefreshTokenHandler)
  .post('/logout', logoutHandler)
  .post('/registration', requestCountMiddleware, requestLoggerMiddleware, authInputValidation, inputValidationResultMiddleware, userRegistrationHandler)
  .post('/registration-confirmation', requestCountMiddleware, requestLoggerMiddleware, inputValidationResultMiddleware, registrationConfirmHandler)
  .post('/registration-email-resending', requestCountMiddleware, requestLoggerMiddleware, inputValidationResultMiddleware, emailResendingHandler)
  .get('/me', authMiddleware, aboutMeHandler)
