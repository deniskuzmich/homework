import {Request, Response} from "express";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {HttpStatuses} from "../../common/types/http-statuses";
import {BlogsService} from "../service/blogs.service";
import {BlogsQueryRepository} from "../repository/blogs-query-repository";
import {injectable, inject} from "inversify";

@injectable()
export class CreateBlogHandler {

  constructor(
    @inject(BlogsService)
    public blogsService: BlogsService,
    @inject(BlogsQueryRepository)
    public blogsQueryRepository: BlogsQueryRepository) {
  }

  async create(req: Request<{}, {}, BlogInputDto>, res: Response) {
    const createdBlog = await this.blogsService.createBlog(req.body);

    if (!createdBlog) {
      res.status(HttpStatuses.BadRequest);
    }

    const blogViewModel = await this.blogsQueryRepository.getBlogById(createdBlog._id.toString())
    res.status(HttpStatuses.Created).send(blogViewModel);
  }
}


