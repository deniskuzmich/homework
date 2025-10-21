import {ValidationErrorType} from "../types/ValidationErrorType";


export const createErrorsMessages = (errors: ValidationErrorType[],):
  {errorsMessages: ValidationErrorType[] } => {
  return {errorsMessages: errors};
}