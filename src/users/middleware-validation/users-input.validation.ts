import { body } from "express-validator";

export const loginValidation = body("login")
  .isString()
  .withMessage("login is not correct")
  .trim()
  .notEmpty()
  .withMessage('login should not be empty')
  .isLength({ min: 3, max: 10 })
  .withMessage("title length is not correct")
  .matches('^[a-zA-Z0-9_-]*$')

export const passwordValidation = body("password")
  .isString()
  .withMessage("password is not correct")
  .notEmpty()
  .withMessage('password should not be empty')
  .isLength({ min: 6, max: 20 })
  .withMessage("password length is not correct");

export const emailValidation = body("email")
  .isString()
  .withMessage("content is not correct")
  .trim()
  .notEmpty()
  .withMessage('content should not be empty')
  .isLength({ min: 6, max: 20 })
  .withMessage("content length is not correct")
  .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')

export const userInputValidation = [
  loginValidation,
  passwordValidation,
  emailValidation,
];
