import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {valuesPaginationMaper} from "../../common/mapper/values-pagination.mapper";
import {BlogsService} from "../../blogs/service/blogs.service";
import {PostsQueryRepository} from "../repository/posts-query-repository";


export class GetPostByBlogIdHandler {
  blogsService: BlogsService;
  postsQueryRepository: PostsQueryRepository;

  constructor(blogsService: BlogsService, postsQueryRepository: PostsQueryRepository) {
    this.blogsService = blogsService;
    this.postsQueryRepository = postsQueryRepository;
  }
   getPost = async(req: Request, res: Response) => {
    const query = valuesPaginationMaper(req.query);

    const blog = await this.blogsService.getBlogById(req.params.id);
    if (!blog) {
      return res.sendStatus(HttpStatuses.NotFound)
    }

    const post = await this.postsQueryRepository.getPostByBlogId(blog._id.toString(), query)
    if (!post) {
      return res.sendStatus(HttpStatuses.NotFound)
    }
    res.status(HttpStatuses.Success).send(post)
  }
}
