import {Request, Response} from "express";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {HttpStatuses} from "../../common/types/http-statuses";
import {BlogsService} from "../service/blogs.service";

export class UpdateBlogHandler {
  blogsService: BlogsService;

  constructor(blogsService: BlogsService) {
    this.blogsService = blogsService;
  }

  update = async (req: Request<{ id: string }, {}, BlogInputDto>, res: Response) => {
    const blog = await this.blogsService.getBlogById(req.params.id);

    if (!blog) {
      return res.sendStatus(HttpStatuses.NotFound);
    }

    await this.blogsService.updateBlog(req.params.id, req.body);
    return res.sendStatus(HttpStatuses.NoContent);
  }
}

