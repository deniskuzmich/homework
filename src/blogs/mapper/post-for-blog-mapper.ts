import {QueryInputForPagination} from "../../common/types/input/query-input-for-pagination";
import {BlogInputWithoutSearch} from "../types/input-types/blog-input-without-search";

export const valuesPaginationMaper = (query: QueryInputForPagination): BlogInputWithoutSearch => {
  return {
    pageNumber: query.pageNumber ? Number(query.pageNumber) : 1,
    pageSize: query.pageSize ? Number(query.pageSize) : 10,
    sortBy: query.sortBy ?? 'createdAt',
    sortDirection: query.sortDirection ?? 'desc',
  }
}