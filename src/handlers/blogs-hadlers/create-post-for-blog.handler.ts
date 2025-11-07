import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";
import {blogsService} from "../../application/blogs.service";
import {mapToPostViewModel} from "../../mappers/posts-mappers/map-to-post-view-model";

export async function createPostForBlogHandler(
  req: Request<{ id: string }>,
  res: Response
) {
    const blogId = req.params.id;

    const blog = await blogsService.getBlogById(blogId);
    if (!blog) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }

    const createdPost = await blogsService.createPostForBlog(blog, req.body);

    const mapedToCreatePost = mapToPostViewModel(createdPost);

    return res.status(HTTP_STATUSES.CREATED_201).send(mapedToCreatePost);
}
