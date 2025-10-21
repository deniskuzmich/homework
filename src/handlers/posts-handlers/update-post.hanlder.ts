import {Request, Response} from "express";
import {postsRepository} from "../../respositories/posts-repository";
import {HTTP_STATUSES} from "../../http_statuses/http_statuses";

export function updatePostHanlder(req: Request, res: Response) {
  const post = postsRepository.updatePost(req.params.id, req.body);
  if (!post) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}