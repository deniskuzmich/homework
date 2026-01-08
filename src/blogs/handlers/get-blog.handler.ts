import { Request, Response } from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {BlogsQueryRepository} from "../repository/blogs-query-repository";


export class GetBlogHandler {
  blogsQueryRepository: BlogsQueryRepository;

  constructor(blogsQueryRepository: BlogsQueryRepository) {
    this.blogsQueryRepository = blogsQueryRepository;
  }

   getBlog = async (req: Request, res: Response) => {
    const blog = await this.blogsQueryRepository.getBlogById(req.params.id);
    if (!blog) {
      return res.sendStatus(HttpStatuses.NotFound);
    }

    res.status(HttpStatuses.Success).send(blog);
  }
}
