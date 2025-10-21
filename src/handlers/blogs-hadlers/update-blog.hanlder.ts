import { Request, Response } from "express";
import { blogsRepository } from "../../respositories/blogs-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";

export function updateBlogHandler(req: Request, res: Response) {
  const blog = blogsRepository.updateBlog(req.params.id, req.body);
  if (!blog) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}
