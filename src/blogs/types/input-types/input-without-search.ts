import {SortDirection} from "mongodb";

export type InputWithoutSearch = {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: SortDirection;
};