import {SortDirection} from "mongodb";

export type InputPaginationWithSearchTermForRepo = {
  pageNumber?: string;
  pageSize?: string;
  sortBy?:string;
  sortDirection?: SortDirection;
  searchLoginTerm?: string,
  searchEmailTerm?: string
};