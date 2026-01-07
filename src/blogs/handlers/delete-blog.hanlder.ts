import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {blogsService} from "../../core/composition/composition-root";

export class DeleteBlogHandler {
  async delete(req: Request, res: Response) {
    const blog = await blogsService.getBlogById(req.params.id);
    if (!blog) {
      res.sendStatus(HttpStatuses.NotFound);
    }

    await blogsService.deleteBlog(req.params.id);
    return res.sendStatus(HttpStatuses.NoContent);
  }
}

