import { Request, Response } from "express";
import {blogsService} from "../service/blogs.service";
import {BlogQueryInputWithoutSearch} from "../types/input-types/blog-query-input-without-search";
import {HttpStatuses} from "../../common/types/http-statuses";

export async function getPostByBlogIdHanlder(req: Request, res:Response) {
  const query: BlogQueryInputWithoutSearch = req.query

  const post = await blogsService.getPostByBlogId(req.params.id, query)
  if(!post) {
    return res.sendStatus(HttpStatuses.NotFound)
  }
  res.status(HttpStatuses.Success).send(post)
}