import {Request, Response} from "express";
import {ResultStatus} from "../../common/types/result.status";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {blogsService} from "../service/blogs.service";
import {HttpStatuses} from "../../common/types/http-statuses";

export async function updateBlogHandler(
  req: Request<{ id: string }, {}, BlogInputDto>,
  res: Response) {
  const blog = await blogsService.getBlogById(req.params.id);

  if (!blog) {
    return res.sendStatus(HttpStatuses.NotFound);
  }

  await blogsService.updateBlog(req.params.id, req.body);
  return res.sendStatus(HttpStatuses.NoContent);
}
