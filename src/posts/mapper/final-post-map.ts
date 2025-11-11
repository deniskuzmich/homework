import {PostOutput} from "../types/main-types/post-output.type";
import {ParamsForFrontOutput} from "../../common/types/params-for-front-output";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";

export const finalPostMapper = (dto: PostOutput[], params: ParamsForFrontOutput):OutputTypeWithPagination<PostOutput> => {
  return {
    pagesCount: params.pagesCount,
    page: params.page,
    pageSize: params.pageSize,
    totalCount: params.totalCount,
    items: dto
  }
}