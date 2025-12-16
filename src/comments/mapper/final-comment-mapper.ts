import {ParamsForFrontOutput} from "../../common/types/params-for-front-output";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {CommentOutput} from "../types/main-types/comment-output.type";

export const finalCommentMapper = (dto: CommentOutput[], params: ParamsForFrontOutput): OutputTypeWithPagination<CommentOutput> => {
  return {
    pagesCount: params.pagesCount,
    page: params.page,
    pageSize: params.pageSize,
    totalCount: params.totalCount,
    items: dto
  }
}