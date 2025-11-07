import {SortDirection} from "mongodb";

export type BlogInputWithSearch = {
  searchNameTerm: string | null;
  pagesNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: SortDirection;
};