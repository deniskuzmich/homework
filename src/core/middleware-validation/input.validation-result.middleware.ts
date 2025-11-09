import { ValidationErrorType } from "../types/validation-types/ValidationErrorType";
import { ValidationErrorTypeDto } from "../types/validation-types/ValidationErrorTypeDto";
import {
  FieldValidationError,
  ValidationError,
  validationResult,
} from "express-validator";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUSES } from "../http_statuses/http_statuses";

export const createErrorMessages = (
  errors: ValidationErrorType[],
): ValidationErrorTypeDto => {
  return { errorsMessages: errors };
};

const formatErrors = (error: ValidationError): ValidationErrorType => {
  const expressError = error as unknown as FieldValidationError;

  return {
    field: expressError.path,
    message: expressError.msg,
  };
};

export const inputValidationResultMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req)
    .formatWith(formatErrors)
    .array({ onlyFirstError: true });

  if (errors.length) {
    return res
      .status(HTTP_STATUSES.BAD_REQUEST_400)
      .json({ errorsMessages: errors });
  }

  next();
};
