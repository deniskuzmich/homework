import {body} from "express-validator";

export const contentValidation = body("content")
  .isString()
  .withMessage("content is not correct")
  .notEmpty()
  .withMessage('content should not be empty')
  .isLength({ min: 20, max: 300 })
  .withMessage("content length is not correct");

export const commentInputValidation = [
  contentValidation
]