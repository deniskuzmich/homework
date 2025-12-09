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
const input_validation_result_middleware_1 = require("../core/middleware-validation/input.validation-result.middleware");
const auth_validation_1 = require("../auth/middleware/auth-validation");
exports.authRouter = (0, express_1.Router)()
    .post('/login', auth_user_handler_1.authUserHandler)
    .post('/registration', auth_validation_1.authInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, user_registration_handler_1.userRegistrationHandler)
    .post('/registration-confirmation', input_validation_result_middleware_1.inputValidationResultMiddleware, registration_confirm_1.registrationConfirmHandler)
    .post('/registration-email-resending', input_validation_result_middleware_1.inputValidationResultMiddleware, email_resending_1.emailResendingHandler)
    .get('/me', auth_middleware_1.authMiddleware, auth_me_handler_1.aboutMeHandler);
// .post('/send', async (req: Request, res: Response) => {
//   try {
//     let transport = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'kuzmichdenis21@gmail.com',
//         pass: 'utzglaowipftlbsr',
//       }
//     });
//
//     let info = await transport.sendMail({
//       from: '"Denis" <kuzmichdenis21@gmail.com>',
//       to: req.body.email,
//       subject: req.body.subject,
//       html: req.body.message
//     });
//
//     res.send({info})
//   } catch (e) {
//     console.log(e)
//   }
// })
