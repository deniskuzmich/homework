import { Request, Response } from "express";
import { postsRepository } from "../../respositories/posts-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";

export function getPostsListHanlder(req: Request, res: Response) {
  const postsBlogs = postsRepository.findPosts(req.query.name?.toString());
  res.status(HTTP_STATUSES.OK_200).send(postsBlogs);
}
