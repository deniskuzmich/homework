import { Request, Response } from "express";
import {blogsService} from "../service/blogs.service";
import {ResultStatus} from "../../common/types/result.status";
import {BlogQueryInputWithoutSearch} from "../types/input-types/blog-query-input-without-search";

export async function getPostByBlogIdHanlder(req: Request, res:Response) {
  const query: BlogQueryInputWithoutSearch = req.query

  const post = await blogsService.getPostByBlogId(req.params.id, query)
  if(!post) {
    return res.sendStatus(ResultStatus.NotFound)
  }
  res.status(ResultStatus.Success).send(post)
}