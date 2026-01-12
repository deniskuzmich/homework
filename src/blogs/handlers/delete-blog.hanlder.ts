import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {BlogsService} from "../service/blogs.service";
import {injectable, inject} from "inversify";

@injectable()
export class DeleteBlogHandler {

  constructor(
    @inject(BlogsService)
    public blogsService: BlogsService) {
  }

  async delete(req: Request, res: Response) {
    const blog = await this.blogsService.getBlogById(req.params.id);
    if (!blog) {
      res.sendStatus(HttpStatuses.NotFound);
    }

    await this.blogsService.deleteBlog(req.params.id);
    return res.sendStatus(HttpStatuses.NoContent);
  }
}

