"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationAndSortingValidationDefault = void 0;
exports.paginationAndSortingValidation = paginationAndSortingValidation;
const sort_direction_1 = require("../../types/sort-direction");
const express_validator_1 = require("express-validator");
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_DIRECTION = sort_direction_1.SortDirection.Desc;
const DEFAULT_SORT_BY = 'createdAt';
exports.paginationAndSortingValidationDefault = {
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: DEFAULT_SORT_DIRECTION,
    sortDirection: DEFAULT_SORT_DIRECTION,
};
function paginationAndSortingValidation(sortFieldsEnum) {
    return [
        (0, express_validator_1.query)('pageNumber')
            .default(DEFAULT_PAGE_NUMBER)
            .isInt({ min: 1 })
            .withMessage('pageNumber must be a positive integer')
            .toInt(),
        (0, express_validator_1.query)('pageSize')
            .default(DEFAULT_PAGE_SIZE)
            .isInt({ min: 1, max: 100 })
            .withMessage('pageSize must be between 1 and 100')
            .toInt(),
        (0, express_validator_1.query)('sortBy')
            .default(Object.values(sortFieldsEnum)[0])
            .isIn(Object.values(sortFieldsEnum))
            .withMessage(`Allowed sort fields: ${Object.values(sortFieldsEnum).join(', ')}`),
        (0, express_validator_1.query)('sortDirection')
            .default(DEFAULT_SORT_DIRECTION)
            .isIn(Object.values((sort_direction_1.SortDirection)))
            .withMessage(`Sort direction must be one of: ${Object.values(sort_direction_1.SortDirection).join(', ')}`),
    ];
}
