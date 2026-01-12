import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {PostsService} from "../service/posts.service";
import {inject, injectable} from "inversify";

@injectable()
export class DeletePostHandler {

  constructor(
    @inject(PostsService)
    public postsService: PostsService) {
  }

  deletePost = async (req: Request, res: Response) => {
    try {
      const post = await this.postsService.getPostById(req.params.id);

      if (!post) {
        res.sendStatus(HttpStatuses.NotFound);
      }

      await this.postsService.deletePost(req.params.id);
      return res.sendStatus(HttpStatuses.NoContent);

    } catch (e: unknown) {
      res.sendStatus(HttpStatuses.ServerError);
    }
  }
}


