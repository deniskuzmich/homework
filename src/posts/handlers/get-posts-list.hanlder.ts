import { Request, Response } from "express";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {PostOutput} from "../types/main-types/post-output.type";
import {HttpStatuses} from "../../common/types/http-statuses";
import {valuesPaginationMaper} from "../../common/mapper/values-pagination.mapper";
import {postsQueryRepository} from "../../core/composition/composition-root";

export class GetPostListHandler {
  async getPostList(req: Request, res: Response) {
    const queryInput = valuesPaginationMaper(req.query)

    const foundPosts:OutputTypeWithPagination<PostOutput> = await postsQueryRepository.findPosts(queryInput);

    res.status(HttpStatuses.Success).send(foundPosts);
  }
}

