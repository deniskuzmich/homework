import {Request, Response} from "express";
import {PostInputDto} from "../types/main-types/post.input-dto";
import {HttpStatuses} from "../../common/types/http-statuses";
import {postsService} from "../../core/composition/composition-root";

export class UpdatePostHandler {
  async updatePost(req: Request<{ id: string }, {}, PostInputDto>, res: Response) {
    try {
      const post = await postsService.getPostById(req.params.id);

      if (!post) {
        return res.sendStatus(HttpStatuses.NotFound);
      }

      await postsService.updatePost(req.params.id, req.body);
      return res.sendStatus(HttpStatuses.NoContent);

    } catch (e: unknown) {
      return res.sendStatus(HttpStatuses.ServerError)
    }
  }
}

