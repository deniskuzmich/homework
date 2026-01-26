import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {valuesPaginationMaper} from "../../common/mapper/values-pagination.mapper";
import {BlogsService} from "../../blogs/service/blogs.service";
import {PostsQueryRepository} from "../repository/posts-query-repository";
import {injectable, inject} from "inversify";

@injectable()
export class GetPostByBlogIdHandler {

  constructor(
    @inject(BlogsService)
    public blogsService: BlogsService,
    @inject(PostsQueryRepository)
    public postsQueryRepository: PostsQueryRepository) {
  }

  async getPost(req: Request, res: Response) {
    const query = valuesPaginationMaper(req.query);
    const userId = req.user?.userId

    const blog = await this.blogsService.getBlogById(req.params.id);
    if (!blog) {
      return res.sendStatus(HttpStatuses.NotFound)
    }

    const post = await this.postsQueryRepository.getPostByBlogId(blog.id, query, userId!)
    if (!post) {
      return res.sendStatus(HttpStatuses.NotFound)
    }
    res.status(HttpStatuses.Success).send(post)
  }
}
