import {ErrorType} from "../../core/types/error-types/ErrorType";
import {FieldValidationError, ValidationError, validationResult,} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {HttpStatuses} from "../types/http-statuses";

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
