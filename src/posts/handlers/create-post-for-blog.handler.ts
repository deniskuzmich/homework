import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {BlogsService} from "../../blogs/service/blogs.service";
import {PostsQueryRepository} from "../repository/posts-query-repository";

export class CreatePostForBlogHandler {
  blogsService: BlogsService;
  postsQueryRepository: PostsQueryRepository;

  constructor(blogsService: BlogsService, postsQueryRepository: PostsQueryRepository) {
    this.blogsService = blogsService;
    this.postsQueryRepository = postsQueryRepository;
  }

  createPost = async (req: Request<{ id: string }>, res: Response) => {
    const blogId = req.params.id;

    const blog = await this.blogsService.getBlogById(blogId);
    if (!blog) {
      return res.sendStatus(HttpStatuses.NotFound);
    }

    const createdPost = await this.blogsService.createPostForBlog(blog, req.body);

    const postForBlog = await this.postsQueryRepository.getPostById(createdPost._id.toString())

    return res.status(HttpStatuses.Created).send(postForBlog);
  }
}

