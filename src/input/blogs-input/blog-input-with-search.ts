import {SortDirection} from "mongodb";

export type BlogInputWithSearch = {
  searchNameTerm: string | null;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: SortDirection;
};