import {Request, Response} from "express";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {PostOutput} from "../types/main-types/post-output.type";
import {HttpStatuses} from "../../common/types/http-statuses";
import {valuesPaginationMaper} from "../../common/mapper/values-pagination.mapper";
import {PostsQueryRepository} from "../repository/posts-query-repository";
import {inject, injectable} from "inversify";

@injectable()
export class GetPostListHandler {

  constructor(
    @inject(PostsQueryRepository)
    public postsQueryRepository: PostsQueryRepository) {
  }

  async getPostList(req: Request, res: Response) {
    const queryInput = valuesPaginationMaper(req.query)
    const userId = req.user?.userId

    const foundPosts: OutputTypeWithPagination<PostOutput> = await this.postsQueryRepository.findPosts(queryInput, userId!);

    res.status(HttpStatuses.Success).send(foundPosts);
  }
}

