import { Request, Response } from "express";
import { blogsRepository } from "../../respositories/blogs-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";

export function getBlogsListHandler(req: Request, res: Response) {
  const foundBlogs = blogsRepository.findBlogs(req.query.name?.toString());
  res.status(HTTP_STATUSES.OK_200).send(foundBlogs);
}
