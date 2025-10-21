import {body} from "express-validator";

const titleValidation = body('title')
  .isString()
  .withMessage('title is not correct')
  .trim()
  .isLength({min: 1, max: 30})
  .withMessage('title length is not correct')

const shortDescriptionValidation = body('shortDescription')
  .isString()
  .withMessage('shortDescription is not correct')
  .trim()
  .isLength({min: 1, max: 100})
  .withMessage('shortDescription length is not correct')

const contentValidation = body('content')
  .isString()
  .withMessage('content is not correct')
  .trim()
  .isLength({min: 1, max: 1000})
  .withMessage('content length is not correct')

const blogIdValidation = body('blogId')
  .exists()
  .withMessage('blogId is required')
  .trim()
  .isString()
  .withMessage('blogId must be a string')



export const postInputValidation = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  blogIdValidation
]

