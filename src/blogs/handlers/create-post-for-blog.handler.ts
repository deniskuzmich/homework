import {Request, Response} from "express";
import {ResultStatus} from "../../common/types/result.status";
import {blogsService} from "../service/blogs.service";
import {mapToPostViewModel} from "../../posts/mapper/map-to-post-view-model";

export async function createPostForBlogHandler(
  req: Request<{ id: string }>,
  res: Response
) {
    const blogId = req.params.id;

    const blog = await blogsService.getBlogById(blogId);
    if (!blog) {
      return res.sendStatus(ResultStatus.NotFound);
    }

    const createdPost = await blogsService.createPostForBlog(blog, req.body);

    const postForBlog = mapToPostViewModel(createdPost);

    return res.status(ResultStatus.CREATED_201).send(postForBlog);
}
