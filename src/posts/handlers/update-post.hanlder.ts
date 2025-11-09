import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";
import {PostInputDto} from "../types/main-types/post.input-dto";
import {postsService} from "../service/posts.service";

export async function updatePostHanlder(
  req: Request<{ id: string }, {}, PostInputDto>,
  res: Response) {
  try {
    const post = await postsService.getPostById(req.params.id);

    if (!post) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }

    await postsService.updatePost(req.params.id, req.body);
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);

  } catch (e: unknown) {
    return res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
  }
}
