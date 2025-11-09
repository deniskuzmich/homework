import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";
import {postsService} from "../service/posts.service";

export async function deletePostHanlder(req: Request, res: Response) {
  try {
    const post = await postsService.getPostById(req.params.id);

    if (!post) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }

    await postsService.deletePost(req.params.id);
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);

  } catch (e: unknown) {
    res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
  }
}

