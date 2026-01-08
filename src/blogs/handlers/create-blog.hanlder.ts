import {Request, Response} from "express";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {HttpStatuses} from "../../common/types/http-statuses";
import {BlogsService} from "../service/blogs.service";
import {BlogsQueryRepository} from "../repository/blogs-query-repository";

export class CreateBlogHandler {
  blogsService: BlogsService;
  blogsQueryRepository: BlogsQueryRepository;

  constructor(blogsService: BlogsService, blogsQueryRepository: BlogsQueryRepository) {
    this.blogsService = blogsService;
    this.blogsQueryRepository = blogsQueryRepository;
  }

  create = async (req: Request<{}, {}, BlogInputDto>, res: Response) => {
    const createdBlog = await this.blogsService.createBlog(req.body);

    if (!createdBlog) {
      res.status(HttpStatuses.BadRequest);
    }

    const blogViewModel = await this.blogsQueryRepository.getBlogById(createdBlog._id.toString())
    res.status(HttpStatuses.Created).send(blogViewModel);
  }
}


