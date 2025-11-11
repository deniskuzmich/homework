"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInputDtoValidation = void 0;
const pagination_validation_1 = require("../../common/validation/pagination-validation");
exports.userInputDtoValidation = [
    pagination_validation_1.sortBy,
    pagination_validation_1.sortDirection,
    pagination_validation_1.pageNumber,
    pagination_validation_1.pageSize,
    pagination_validation_1.searchLoginTerm,
    pagination_validation_1.searchEmailTerm,
];
