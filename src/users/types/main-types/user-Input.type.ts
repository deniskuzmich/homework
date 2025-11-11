import {SortDirection} from "mongodb";

export type UsersInput = {
  sortBy: string,
  sortDirection: SortDirection,
  pageNumber: number,
  pageSize: number,
  searchLoginTerm: string | null,
  searchEmailTerm: string | null
}