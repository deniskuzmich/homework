import { Request, Response } from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {BlogsQueryRepository} from "../repository/blogs-query-repository";
import {injectable, inject} from "inversify";

@injectable()
export class GetBlogHandler {

  constructor(
    @inject(BlogsQueryRepository)
    private blogsQueryRepository: BlogsQueryRepository) {}

   async getBlog (req: Request, res: Response) {
    const blog = await this.blogsQueryRepository.getBlogById(req.params.id);
    if (!blog) {
      return res.sendStatus(HttpStatuses.NotFound);
    }

    return res.status(HttpStatuses.Success).send(blog);
  }
}
