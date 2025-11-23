import { Request, Response } from "express";
import { ResultStatus } from "../../common/types/result.status";
import {blogsService} from "../service/blogs.service";
import {HttpStatuses} from "../../common/types/http-statuses";

export async function deleteBlogHandler(req: Request, res: Response) {
    const blog = await blogsService.getBlogById(req.params.id);
    if (!blog) {
      res.sendStatus(HttpStatuses.NotFound);
    }

    await blogsService.deleteBlog(req.params.id);
    return res.sendStatus(HttpStatuses.NoContent);
}
