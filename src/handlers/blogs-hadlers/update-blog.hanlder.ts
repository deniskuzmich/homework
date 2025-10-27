import { Request, Response } from "express";
import { blogsRepository } from "../../respositories/blogs-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";
import {BlogInputDto} from "../../input-types/blog.input-dto";

export async function updateBlogHandler(
  req: Request<{id: string}, {}, BlogInputDto>,
  res: Response)
{
  try {
    const blog = blogsRepository.getBlogById(req.params.id);

    if (!blog) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }

    await blogsRepository.updateBlog(req.params.id, req.body);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);

  } catch (e: unknown) {
    res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
  }
}
