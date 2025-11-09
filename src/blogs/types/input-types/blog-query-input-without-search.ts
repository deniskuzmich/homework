import {SortDirection} from "mongodb";

export type BlogQueryInputWithoutSearch = {
  pageNumber?: string;
  pageSize?: string;
  sortBy?:string;
  sortDirection?: SortDirection;
};