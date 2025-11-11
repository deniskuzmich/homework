import {BlogOutput} from "../types/main-types/blog-output.type";
import {ParamsForFrontOutput} from "../../common/types/params-for-front-output";

export const finalBlogMapper = (dto: BlogOutput[], params: ParamsForFrontOutput) => {
  return {
    pagesCount: params.pagesCount,
    page: params.page,
    pageSize: params.pageSize,
    totalCount: params.totalCount,
    items: dto
  }
}