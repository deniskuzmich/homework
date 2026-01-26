import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {PostsQueryRepository} from "../repository/posts-query-repository";
import {inject, injectable} from "inversify";

@injectable()
export class GetPostHandler {

  constructor(
    @inject(PostsQueryRepository)
    public postsQueryRepository: PostsQueryRepository) {
  }

  async getPost(req: Request, res: Response) {
    const userId = req.user?.userId
    try {
      const post = await this.postsQueryRepository.getPostById(req.params.id, userId!);
      if (!post) {
        return res.sendStatus(HttpStatuses.NotFound);
      }
      res.status(HttpStatuses.Success).send(post);
    } catch (e: unknown) {
      return res.sendStatus(HttpStatuses.ServerError)
    }
  }
}

