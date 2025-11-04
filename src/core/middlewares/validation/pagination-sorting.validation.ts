import {SortDirection} from "../../types/sort-direction";
import {query} from "express-validator";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
const DEFAULT_SORT_BY = 'createdAt';

export const paginationAndSortingValidationDefault = {
  pageNumber: DEFAULT_PAGE_NUMBER,
  pageSize: DEFAULT_PAGE_SIZE,
  sortBy: DEFAULT_SORT_DIRECTION,
  sortDirection: DEFAULT_SORT_DIRECTION,
}

export function paginationAndSortingValidation<T extends string>(sortFieldsEnum: Record<string, T>) {
  return [
    query('pageNumber')
      .default(DEFAULT_PAGE_NUMBER)
      .isInt({min: 1})
      .withMessage('pageNumber must be a positive integer')
      .toInt(),

    query('pageSize')
      .default(DEFAULT_PAGE_SIZE)
      .isInt({min: 1, max: 100})
      .withMessage('pageSize must be between 1 and 100')
      .toInt(),

    query('sortBy')
      .default(Object.values(sortFieldsEnum)[0])
      .isIn(Object.values(sortFieldsEnum))
      .withMessage(`Allowed sort fields: ${Object.values(sortFieldsEnum).join(', ')}`),

    query('sortDirection')
      .default(DEFAULT_SORT_DIRECTION)
      .isIn(Object.values((SortDirection)))
      .withMessage(`Sort direction must be one of: ${Object.values(SortDirection).join(', ')}`),
  ]
}