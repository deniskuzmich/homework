import { Request, Response } from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {postsQueryRepository} from "../repository/posts-query-repository";
import {valuesPaginationMaper} from "../../blogs/mapper/post-for-blog-mapper";
import {blogsService} from "../../blogs/service/blogs.service";

export async function getPostByBlogIdHanlder(req: Request, res:Response) {
  const query = valuesPaginationMaper(req.query);

  const blog = await blogsService.getBlogById(req.params.id);
  if(!blog) {
    return res.sendStatus(HttpStatuses.NotFound)
  }

  const post = await postsQueryRepository.getPostByBlogId(blog._id.toString(), query)
  if(!post) {
    return res.sendStatus(HttpStatuses.NotFound)
  }
  res.status(HttpStatuses.Success).send(post)
}