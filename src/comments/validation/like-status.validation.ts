import { body } from 'express-validator';

export const likeStatusValidator = body('likeStatus')
  .isString()
  .trim()
  .isIn(['None', 'Like', 'Dislike'])
  .withMessage('Invalid likeStatus');