import {SortDirection} from "mongodb";

export type InputPaginationForRepo = {
  sortBy: string,
  sortDirection: SortDirection,
  pageNumber: number,
  pageSize: number
}