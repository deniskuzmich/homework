import { Request, Response } from "express";
import { blogsRepository } from "../../respositories/blogs-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";


export function postBlogHanlder(req: Request, res: Response) {
  const newBlog = blogsRepository.createBlog(req.body);
  res.status(HTTP_STATUSES.CREATED_201).send(newBlog);
  if (!newBlog) {
    res.status(HTTP_STATUSES.BAD_REQUEST_400)
  }
}
