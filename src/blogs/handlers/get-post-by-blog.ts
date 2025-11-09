import { Request, Response } from "express";
import {blogsService} from "../service/blogs.service";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";
import {BlogQueryInputWithoutSearch} from "../types/input-types/blog-query-input-without-search";

export async function getPostByBlogIdHanlder(req: Request, res:Response) {
  const query: BlogQueryInputWithoutSearch = req.query

  const post = await blogsService.getPostByBlogId(req.params.id, query)
  if(!post) {
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
  res.status(HTTP_STATUSES.OK_200).send(post)
}