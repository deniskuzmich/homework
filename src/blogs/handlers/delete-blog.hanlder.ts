import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../core/http_statuses/http_statuses";
import {blogsService} from "../service/blogs.service";

export async function deleteBlogHandler(req: Request, res: Response) {
    const blog = await blogsService.getBlogById(req.params.id);
    if (!blog) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }

    await blogsService.deleteBlog(req.params.id);
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
}
