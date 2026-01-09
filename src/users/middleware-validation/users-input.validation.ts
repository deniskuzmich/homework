import { body } from "express-validator";

export const loginValidation = body("login")
  .isString()
  .withMessage("login is not correct")
  .trim()
  .notEmpty()
  .withMessage('login should not be empty')
  .isLength({ min: 3, max: 10 })
  .withMessage("login length is not correct")
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
  .withMessage("email is not correct")
  .trim()
  .notEmpty()
  .withMessage('email should not be empty')
  .matches('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
  .withMessage("email length is not correct")
  .isEmail()
  .withMessage("email is not correct")

export const userInputValidation = [
  loginValidation,
  passwordValidation,
  emailValidation,
];
