import {Router} from "express";
import {authUserHandler} from "../auth/auth-user/handler/auth-user.handler";
import {authMiddleware} from "../auth/middleware/auth.middleware";
import {aboutMeHandler} from "../auth/auth-user/handler/auth-me-handler";
import {userRegistrationHandler} from "../auth/auth-user/handler/user-registration.handler";
import {registrationConfirmHandler} from "../auth/auth-user/handler/registration-confirm";
import {emailResendingHandler} from "../auth/auth-user/handler/email-resending";
import {inputValidationResultMiddleware} from "../core/middleware-validation/input.validation-result.middleware";
import {authInputValidation} from "../auth/middleware/auth-validation";
import {authRefreshTokenHandler} from "../auth/auth-user/handler/refresh-token.handler";
import {logoutHandler} from "../auth/auth-user/handler/logout.handler";

export const authRouter = Router()
  .post('/login', authUserHandler)
  .post('/refresh-token', authRefreshTokenHandler)
  .post('/logout', logoutHandler)
  .post('/registration', authInputValidation, inputValidationResultMiddleware, userRegistrationHandler)
  .post('/registration-confirmation', inputValidationResultMiddleware, registrationConfirmHandler)
  .post('/registration-email-resending', inputValidationResultMiddleware, emailResendingHandler)
  .get('/me', authMiddleware, aboutMeHandler)
