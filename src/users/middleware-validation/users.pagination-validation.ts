import {
  sortBy,
  sortDirection,
  pageNumber,
  pageSize,
  searchLoginTerm,
  searchEmailTerm,
} from "../../common/validation/pagination-validation";

export const userInputDtoValidation = [
  sortBy,
  sortDirection,
  pageNumber,
  pageSize,
  searchLoginTerm,
  searchEmailTerm,
];