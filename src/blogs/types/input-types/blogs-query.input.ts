import {SortDirection} from "mongodb";

export type BlogQueryInput = {
  searchNameTerm?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
};
