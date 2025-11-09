import {BlogQueryInputWithoutSearch} from "../types/input-types/blog-query-input-without-search";
import {BlogInputWithoutSearch} from "../types/input-types/blog-input-without-search";

export const valuesPaginationMaper = (query: BlogQueryInputWithoutSearch): BlogInputWithoutSearch => {
  return {
    pageNumber: query.pageNumber ? Number(query.pageNumber) : 1,
    pageSize: query.pageSize ? Number(query.pageSize) : 10,
    sortBy: query.sortBy ?? 'createdAt',
    sortDirection: query.sortDirection ?? 'desc',
  }
}