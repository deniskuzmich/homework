import {Request, Response} from "express";
import {PostInputDto} from "../types/main-types/post.input-dto";
import {HttpStatuses} from "../../common/types/http-statuses";
import {PostsService} from "../service/posts.service";
import {inject, injectable} from "inversify";

@injectable()
export class UpdatePostHandler {

  constructor(
    @inject(PostsService)
    public postsService: PostsService) {}

  async updatePost (req: Request<{ id: string }, {}, PostInputDto>, res: Response) {
    try {
      const post = await this.postsService.getPostById(req.params.id);

      if (!post) {
        return res.sendStatus(HttpStatuses.NotFound);
      }

      await this.postsService.updatePost(req.params.id, req.body);
      return res.sendStatus(HttpStatuses.NoContent);

    } catch (e: unknown) {
      return res.sendStatus(HttpStatuses.ServerError)
    }
  }
}

