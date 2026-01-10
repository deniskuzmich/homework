import {body} from "express-validator";

export const newPasswordValidation = body("newPassword")
  .isString()
  .withMessage("password is not correct")
  .notEmpty()
  .withMessage('password should not be empty')
  .isLength({ min: 6, max: 20})
  .withMessage("password length is not correct");

