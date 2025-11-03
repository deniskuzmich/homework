import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";
import {blogsService} from "../../application/blogs.service";

export async function deleteBlogHanlder(req: Request, res: Response) {
  try {
    const blog = await blogsService.getBlogById(req.params.id);
    if (!blog) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }

    await blogsService.deleteBlog(req.params.id);
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);


  } catch (e: unknown) {
    res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500);
  }
}
