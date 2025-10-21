import { Request, Response } from "express";
import { blogsRepository } from "../../respositories/blogs-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";

export function deleteBlogHanlder(req: Request, res: Response) {
  const deletedBlog = blogsRepository.deleteBlog(req.params.id);
  if (deletedBlog) {
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
}
