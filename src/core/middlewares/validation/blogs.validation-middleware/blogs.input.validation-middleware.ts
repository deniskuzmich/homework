import {body} from "express-validator";

const nameValidation = body('name')
  .isString()
  .withMessage('name is not correct')
  .trim()
  .isLength({min: 1, max: 15})
  .withMessage('name length is not correct')

const descriptionValidation = body('description')
  .isString()
  .withMessage('description is not correct')
  .trim()
  .isLength({min: 1, max: 500})
  .withMessage('description length is not correct')

const websiteUrlValidation = body('websiteUrl')
  .isString()
  .withMessage('websiteUrl is not correct')
  .isLength({min: 1, max: 100})
  .withMessage('websiteUrl length is not correct')
  .isURL()
  .withMessage('websiteUrl address is not correct')

export const blogsInputValidation = [
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
]