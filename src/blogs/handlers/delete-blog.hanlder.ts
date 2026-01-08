import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {BlogsService} from "../service/blogs.service";

export class DeleteBlogHandler {
  blogsService: BlogsService;

  constructor(blogsService: BlogsService) {
    this.blogsService = blogsService;
  }
   delete = async(req: Request, res: Response) => {
    const blog = await this.blogsService.getBlogById(req.params.id);
    if (!blog) {
      res.sendStatus(HttpStatuses.NotFound);
    }

    await this.blogsService.deleteBlog(req.params.id);
    return res.sendStatus(HttpStatuses.NoContent);
  }
}

