import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {PostsQueryRepository} from "../repository/posts-query-repository";

export class GetPostHandler {
  postsQueryRepository: PostsQueryRepository

  constructor(postsQueryRepository: PostsQueryRepository) {
    this.postsQueryRepository = postsQueryRepository
  }

  getPost = async (req: Request, res: Response) => {
    try {
      const post = await this.postsQueryRepository.getPostById(req.params.id);
      if (!post) {
        return res.sendStatus(HttpStatuses.NotFound);
      }
      res.status(HttpStatuses.Success).send(post);
    } catch (e: unknown) {
      return res.sendStatus(HttpStatuses.ServerError)
    }
  }
}

