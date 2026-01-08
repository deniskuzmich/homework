import {Request, Response} from "express";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {PostOutput} from "../types/main-types/post-output.type";
import {HttpStatuses} from "../../common/types/http-statuses";
import {valuesPaginationMaper} from "../../common/mapper/values-pagination.mapper";
import {PostsQueryRepository} from "../repository/posts-query-repository";


export class GetPostListHandler {
  postsQueryRepository: PostsQueryRepository

  constructor(postsQueryRepository: PostsQueryRepository) {
    this.postsQueryRepository = postsQueryRepository
  }

  getPostList = async (req: Request, res: Response) => {
    const queryInput = valuesPaginationMaper(req.query)

    const foundPosts: OutputTypeWithPagination<PostOutput> = await this.postsQueryRepository.findPosts(queryInput);

    res.status(HttpStatuses.Success).send(foundPosts);
  }
}

