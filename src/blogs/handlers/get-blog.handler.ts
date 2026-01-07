import { Request, Response } from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {blogsQueryRepository} from "../../core/composition/composition-root";


export class GetBlogHandler {
  async getBlog(req: Request, res: Response) {
    const blog = await blogsQueryRepository.getBlogById(req.params.id);
    if (!blog) {
      return res.sendStatus(HttpStatuses.NotFound);
    }

    res.status(HttpStatuses.Success).send(blog);
  }
}
