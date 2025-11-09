import {
  contentValidation,
  shortDescriptionValidation,
  titleValidation
} from "./posts.input.validation-middleware";

export const postInputDtoValidation = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
];