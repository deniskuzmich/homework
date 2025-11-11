import {query} from "express-validator";

export const searchNameTermValidation = query('searchNameTerm')
  .optional()
  .isString()
  .withMessage("searchNameTerm should be a string");

export const sortBy = query('sortBy')
  .optional()
  .isString()
  .withMessage("sortBy should be a string")

export const sortDirection = query('sortDirection')
  .optional()
  .isString()
  .withMessage("sortDirection should be a string");

export const pageNumber = query('pageNumber')
  .optional()
  .isInt()
  .withMessage("pageNumber should be a number");

export const pageSize = query('pageSize')
  .optional()
  .isInt()
  .withMessage("pageSize should be a number");

export const searchLoginTerm = query('searchLoginTerm')
  .isString()
  .withMessage("searchLoginTerm should be a string");

export const searchEmailTerm = query('searchEmailTerm')
  .isString()
  .withMessage("searchEmailTerm should be a string");


export const paginationValidation = [
  searchNameTermValidation,
  sortBy,
  sortDirection,
  pageNumber,
  pageSize,
  searchLoginTerm,
  searchEmailTerm,
];