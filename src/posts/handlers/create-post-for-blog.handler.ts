import {Request, Response} from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {blogsService, postsQueryRepository} from "../../core/composition/composition-root";

export class CreatePostForBlogHandler {
  async createPost(req: Request<{ id: string }>, res: Response) {
    const blogId = req.params.id;

    const blog = await blogsService.getBlogById(blogId);
    if (!blog) {
      return res.sendStatus(HttpStatuses.NotFound);
    }

    const createdPost = await blogsService.createPostForBlog(blog, req.body);

    const postForBlog = await postsQueryRepository.getPostById(createdPost._id.toString())

    return res.status(HttpStatuses.Created).send(postForBlog);
  }
}

