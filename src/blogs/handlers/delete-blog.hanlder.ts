import { Request, Response } from "express";
import { ResultStatus } from "../../common/types/result.status";
import {blogsService} from "../service/blogs.service";

export async function deleteBlogHandler(req: Request, res: Response) {
    const blog = await blogsService.getBlogById(req.params.id);
    if (!blog) {
      res.sendStatus(ResultStatus.NotFound);
    }

    await blogsService.deleteBlog(req.params.id);
    return res.sendStatus(ResultStatus.NoContent);
}
