import {InputPaginationWithSearchTermForRepo} from "../../common/types/input/input-pagination-with-seatchterm.type";

export const parseQueryInputForUsers = (query: InputPaginationWithSearchTermForRepo) => {
  return {
    sortBy: query.sortBy ?? 'createdAt',
    sortDirection: query.sortDirection ?? 'desc',
    pageNumber: query.pageNumber ? Number(query.pageNumber) : 1,
    pageSize: query.pageSize ? Number(query.pageSize) : 10,
    searchLoginTerm: query.searchLoginTerm ?? null,
    searchEmailTerm: query.searchEmailTerm ?? null
  }
}