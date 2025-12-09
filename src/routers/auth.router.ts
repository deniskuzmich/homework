import {Router} from "express";
import {authUserHandler} from "../auth/auth-user/handler/auth-user.handler";
import {authMiddleware} from "../auth/middleware/auth.middleware";
import {aboutMeHandler} from "../auth/auth-user/handler/auth-me-handler";
import {userRegistrationHandler} from "../auth/auth-user/handler/user-registration.handler";
import {registrationConfirmHandler} from "../auth/auth-user/handler/registration-confirm";
import {emailResendingHandler} from "../auth/auth-user/handler/email-resending";
import {inputValidationResultMiddleware} from "../core/middleware-validation/input.validation-result.middleware";
import {authInputValidation} from "../auth/middleware/auth-validation";
import {Request, Response} from "express";
import nodemailer from "nodemailer";


export const authRouter = Router()
  .post('/login', authUserHandler)
  .post('/registration', authInputValidation, inputValidationResultMiddleware, userRegistrationHandler)
  .post('/registration-confirmation', inputValidationResultMiddleware, registrationConfirmHandler)
  .post('/registration-email-resending', inputValidationResultMiddleware, emailResendingHandler)
  .get('/me', authMiddleware, aboutMeHandler)

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
