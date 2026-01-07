import {Request, Response} from "express";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {HttpStatuses} from "../../common/types/http-statuses";
import {blogsQueryRepository, blogsService} from "../../core/composition/composition-root";

export class CreateBlogHandler {
  async create(req: Request<{}, {}, BlogInputDto>, res: Response) {
    const createdBlog = await blogsService.createBlog(req.body);

    if (!createdBlog) {
      res.status(HttpStatuses.BadRequest);
    }

    const blogViewModel = await blogsQueryRepository.getBlogById(createdBlog._id.toString())
    res.status(HttpStatuses.Created).send(blogViewModel);
  }
}

