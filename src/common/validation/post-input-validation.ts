import {
  contentValidation,
  shortDescriptionValidation,
  titleValidation
} from "../../core/middlewares/validation/posts.validation-middleware/posts.input.validation-middleware";

export const postInputDtoValidation = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,

];