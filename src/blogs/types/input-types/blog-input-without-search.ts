import {SortDirection} from "mongodb";

export type BlogInputWithoutSearch = {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: SortDirection;
};