import {Request, Response} from "express";
import {postsRepository} from "../../respositories/posts-repository";
import {HTTP_STATUSES} from "../../http_statuses/http_statuses";

export function deletePostHanlder(req: Request, res: Response) {
  const deletedPost = postsRepository.deletePost(req.params.id);
  if (deletedPost) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
}