import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {blogsService} from "../service/blogs.service";

export async function updateBlogHandler(
  req: Request<{ id: string }, {}, BlogInputDto>,
  res: Response) {
  const blog = await blogsService.getBlogById(req.params.id);

  if (!blog) {
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }

  await blogsService.updateBlog(req.params.id, req.body);
  return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}
