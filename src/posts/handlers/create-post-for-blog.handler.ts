import {Request, Response} from "express";
import {blogsService} from "../../blogs/service/blogs.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {postsQueryRepository} from "../repository/posts-query-repository";
import {valuesPaginationMaper} from "../../blogs/mapper/post-for-blog-mapper";

export async function createPostForBlogHandler(
  req: Request<{ id: string }>,
  res: Response
) {
    const query = valuesPaginationMaper(req.query);
    const blogId = req.params.id;

    const blog = await blogsService.getBlogById(blogId);
    if (!blog) {
      return res.sendStatus(HttpStatuses.NotFound);
    }

    const createdPost = await blogsService.createPostForBlog(blog, req.body);

    const postForBlog = await postsQueryRepository.getPostById(createdPost.blogId.toString())

    return res.status(HttpStatuses.Created).send(postForBlog);
}