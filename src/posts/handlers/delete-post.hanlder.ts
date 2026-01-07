import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {postsService} from "../../core/composition/composition-root";

export class DeletePostHandler {
  async deletePost(req: Request, res: Response) {
    try {
      const post = await postsService.getPostById(req.params.id);

      if (!post) {
        res.sendStatus(HttpStatuses.NotFound);
      }

      await postsService.deletePost(req.params.id);
      return res.sendStatus(HttpStatuses.NoContent);

    } catch (e: unknown) {
      res.sendStatus(HttpStatuses.ServerError);
    }
  }
}


