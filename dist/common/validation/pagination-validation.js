"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationValidation = exports.searchEmailTerm = exports.searchLoginTerm = exports.pageSize = exports.pageNumber = exports.sortDirection = exports.sortBy = exports.searchNameTermValidation = void 0;
const express_validator_1 = require("express-validator");
exports.searchNameTermValidation = (0, express_validator_1.query)('searchNameTerm')
    .optional()
    .isString()
    .withMessage("searchNameTerm should be a string");
exports.sortBy = (0, express_validator_1.query)('sortBy')
    .optional()
    .isString()
    .withMessage("sortBy should be a string");
exports.sortDirection = (0, express_validator_1.query)('sortDirection')
    .optional()
    .isString()
    .withMessage("sortDirection should be a string");
exports.pageNumber = (0, express_validator_1.query)('pageNumber')
    .optional()
    .isInt()
    .withMessage("pageNumber should be a number");
exports.pageSize = (0, express_validator_1.query)('pageSize')
    .optional()
    .isInt()
    .withMessage("pageSize should be a number");
exports.searchLoginTerm = (0, express_validator_1.query)('searchLoginTerm')
    .isString()
    .withMessage("searchLoginTerm should be a string");
exports.searchEmailTerm = (0, express_validator_1.query)('searchEmailTerm')
    .isString()
    .withMessage("searchEmailTerm should be a string");
exports.paginationValidation = [
    exports.searchNameTermValidation,
    exports.sortBy,
    exports.sortDirection,
    exports.pageNumber,
    exports.pageSize,
    exports.searchLoginTerm,
    exports.searchEmailTerm,
];
