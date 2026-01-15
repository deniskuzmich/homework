import {Request, Response} from "express";
import {BlogInputDto} from "../types/input-types/blog.input-dto";
import {HttpStatuses} from "../../common/types/http-statuses";
import {BlogsService} from "../service/blogs.service";
import {BlogsQueryRepository} from "../repository/blogs-query-repository";
import {inject, injectable} from "inversify";

@injectable()
export class CreateBlogHandler {

  constructor(
    @inject(BlogsService)
    public blogsService: BlogsService,
    @inject(BlogsQueryRepository)
    public blogsQueryRepository: BlogsQueryRepository) {
  }

  async create(req: Request<{}, {}, BlogInputDto>, res: Response) {
    const blogId = await this.blogsService.createBlog(req.body);

    if (!blogId) {
      return res.sendStatus(HttpStatuses.BadRequest);
    }

    const blogViewModel = await this.blogsQueryRepository.getBlogById(blogId)
    return res.status(HttpStatuses.Created).send(blogViewModel);
  }
}


