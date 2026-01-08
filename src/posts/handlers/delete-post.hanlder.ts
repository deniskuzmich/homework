import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {PostsService} from "../service/posts.service";

export class DeletePostHandler {
  postsService: PostsService;

  constructor(postsService: PostsService) {
    this.postsService = postsService;
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


