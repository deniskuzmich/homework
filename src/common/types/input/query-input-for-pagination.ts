import {SortDirection} from "mongodb";

export type QueryInputForPagination = {
  pageNumber?: string;
  pageSize?: string;
  sortBy?:string;
  sortDirection?: SortDirection;
};