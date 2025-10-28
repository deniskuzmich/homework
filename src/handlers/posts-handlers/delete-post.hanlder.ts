import {Request, Response} from "express";
import {postsRepository} from "../../respositories/posts-repository";
import {HTTP_STATUSES} from "../../http_statuses/http_statuses";

export async function deletePostHanlder(req: Request, res: Response) {
  try {
    const post = await postsRepository.getPostById(req.params.id);

    if (!post) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }

    await postsRepository.deletePost(req.params.id);
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);

  } catch (e: unknown) {
    res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
  }
}

