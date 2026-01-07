import {Request, Response} from "express";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {HttpStatuses} from "../../common/types/http-statuses";
import {blogsService} from "../../core/composition/composition-root";

export class UpdateBlogHandler {
  async update(req: Request<{ id: string }, {}, BlogInputDto>, res: Response) {
    const blog = await blogsService.getBlogById(req.params.id);

    if (!blog) {
      return res.sendStatus(HttpStatuses.NotFound);
    }

    await blogsService.updateBlog(req.params.id, req.body);
    return res.sendStatus(HttpStatuses.NoContent);
  }
}

