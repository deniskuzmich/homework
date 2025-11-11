import {UserOutput} from "../types/main-types/user-output.type";
import {ParamsForFrontOutput} from "../../common/types/params-for-front-output";

export const userForFrontMapper = (dto: UserOutput[], params: ParamsForFrontOutput) => {
  return {
    pagesCount: params.pagesCount,
    page: params.page,
    pageSize: params.pageSize,
    totalCount: params.totalCount,
    items: dto
  }
}