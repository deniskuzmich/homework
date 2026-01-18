import {Router} from "express";
import {inputValidationResultMiddleware} from "../common/middleware-validation/input.validation-result.middleware";
import {authInputValidation, emailValidation} from "../auth/middleware/auth-validation";
import {requestLoggerMiddleware} from "../devices/middleware/request-log-middleware";
import {requestCountMiddleware} from "../devices/middleware/request-count-middleware";
import {newPasswordValidation} from "../auth/middleware/new-password-validation";
import {container} from "../core/ioc/ioc";
import {AuthUserHandler} from "../auth/auth-user/handler/auth-user.handler";
import {AuthRefreshTokenHandler} from "../auth/auth-user/handler/refresh-token.handler";
import {LogoutHandler} from "../auth/auth-user/handler/logout.handler";
import {UserRegistrationHandler} from "../auth/auth-user/handler/user-registration.handler";
import {RegistrationConfirmHandler} from "../auth/auth-user/handler/registration-confirm";
import {EmailResendingHandler} from "../auth/auth-user/handler/email-resending";
import {PasswordRecovery} from "../auth/auth-user/handler/password-recovery";
import {NewPasswordHandler} from "../auth/auth-user/handler/new-password.handler";
import {AboutMeHandler} from "../auth/auth-user/handler/auth-me-handler";
import {AuthMiddleWare} from "../auth/middleware/auth.middleware";

const authHandler = container.get(AuthUserHandler)
const authRefreshTokenHandler = container.get(AuthRefreshTokenHandler)
const logoutHandler = container.get(LogoutHandler)
const userRegistrationHandler = container.get(UserRegistrationHandler)
const registrationConfirmHandler = container.get(RegistrationConfirmHandler)
const emailResendingHandler = container.get(EmailResendingHandler)
const passwordRecoveryHandler = container.get(PasswordRecovery)
const newPasswordHandler = container.get(NewPasswordHandler)
const aboutMeHandler = container.get(AboutMeHandler)
const authMiddleware = container.get(AuthMiddleWare);

export const authRouter = Router()
  .post('/login',
    requestCountMiddleware,
    requestLoggerMiddleware,
    authHandler.login.bind(authHandler))

  .post('/refresh-token',
    authRefreshTokenHandler.refreshToken.bind(authRefreshTokenHandler))

  .post('/logout',
    logoutHandler.logout.bind(logoutHandler))

  .post('/registration',
    requestCountMiddleware,
    requestLoggerMiddleware,
    authInputValidation,
    inputValidationResultMiddleware,
    userRegistrationHandler.registration.bind(userRegistrationHandler))

  .post('/registration-confirmation',
    requestCountMiddleware,
    requestLoggerMiddleware,
    inputValidationResultMiddleware,
    registrationConfirmHandler.confirmation.bind(registrationConfirmHandler))

  .post('/registration-email-resending',
    requestCountMiddleware,
    requestLoggerMiddleware,
    inputValidationResultMiddleware,
    emailResendingHandler.resending.bind(emailResendingHandler))

  .post('/password-recovery',
    requestCountMiddleware,
    requestLoggerMiddleware,
    emailValidation,
    inputValidationResultMiddleware,
    passwordRecoveryHandler.recovery.bind(passwordRecoveryHandler))

  .post('/new-password',
    requestCountMiddleware,
    requestLoggerMiddleware,
    newPasswordValidation,
    inputValidationResultMiddleware,
    newPasswordHandler.newPassword.bind(newPasswordHandler))

  .get('/me',
    authMiddleware.authMiddleWare.bind(authMiddleware),
    aboutMeHandler.me.bind(aboutMeHandler),)
