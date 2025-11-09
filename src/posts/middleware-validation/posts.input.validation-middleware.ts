import { body } from "express-validator";

export const titleValidation = body("title")
  .isString()
  .withMessage("title is not correct")
  .trim()
  .notEmpty()
  .withMessage('Title should not be empty')
  .isLength({ min: 1, max: 30 })
  .withMessage("title length is not correct");

export const shortDescriptionValidation = body("shortDescription")
  .isString()
  .withMessage("shortDescription is not correct")
  .trim()
  .notEmpty()
  .withMessage('shortDescription should not be empty')
  .isLength({ min: 1, max: 100 })
  .withMessage("shortDescription length is not correct");

export const contentValidation = body("content")
  .isString()
  .withMessage("content is not correct")
  .trim()
  .notEmpty()
  .withMessage('content should not be empty')
  .isLength({ min: 1, max: 1000 })
  .withMessage("content length is not correct");

export const blogIdValidation = body("blogId")
  .exists()
  .withMessage("blogId is required")
  .trim()
  .isString()
  .withMessage("blogId must be a string")
  .isMongoId()
  .withMessage('blogId should be MongoId type');

export const postInputValidation = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  blogIdValidation,
];
