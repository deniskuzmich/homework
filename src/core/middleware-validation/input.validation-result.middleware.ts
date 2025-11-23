import { ErrorType } from "../types/error-types/ErrorType";
import { ErrorTypeOutput } from "../types/error-types/ErrorTypeOutput";
import {
  FieldValidationError,
  ValidationError,
  validationResult,
} from "express-validator";
import { NextFunction, Request, Response } from "express";
import {HttpStatuses} from "../../common/types/http-statuses";

export const createErrorMessages = (
  errors: ErrorType[],
): ErrorTypeOutput => {
  return { errorsMessages: errors };
};

const formatErrors = (error: ValidationError): ErrorType => {
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
      .status(HttpStatuses.BadRequest)
      .json({ errorsMessages: errors });
  }

  next();
};
