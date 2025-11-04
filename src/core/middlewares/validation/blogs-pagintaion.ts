import {Blog} from "../../types/blogs-types";

export type BlogsPagintaion = {
  pagesCount: number,
  page: number,
  pageSize: number,
  totalCount: number,
  items: Blog[]
}