import {BlogQueryInput} from "../types/input-types/blogs-query.input";
import {BlogInput} from "../types/main-types/blog-input.type";

export function parseQueryInput(queryDto: BlogQueryInput): BlogInput {
  return {
    pageNumber: queryDto.pageNumber ? Number(queryDto.pageNumber) : 1,
    pageSize: queryDto.pageSize ? Number(queryDto.pageSize) : 10,
    sortBy: queryDto.sortBy ? queryDto.sortBy : 'createdAt',
    sortDirection: queryDto.sortDirection ? queryDto.sortDirection : 'desc',
    searchNameTerm: queryDto.searchNameTerm ? queryDto.searchNameTerm : null
  }
}