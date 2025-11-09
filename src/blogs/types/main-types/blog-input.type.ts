import {SortDirection} from "mongodb";

export type BlogInput = {
  searchNameTerm: string | null;
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: SortDirection;
};