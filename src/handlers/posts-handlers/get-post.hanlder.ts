import { Request, Response } from "express";
import { postsRepository } from "../../respositories/posts-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";

export function getPostHandler(req: Request, res: Response) {
  const post = postsRepository.getPostById(req.params.id);
  if (!post) {
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
  res.status(HTTP_STATUSES.OK_200).send(post);
}
