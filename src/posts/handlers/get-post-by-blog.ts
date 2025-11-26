import { Request, Response } from "express";
import {blogsService} from "../../blogs/service/blogs.service";
import {QueryInputForPagination} from "../../common/types/input/query-input-for-pagination";
import {HttpStatuses} from "../../common/types/http-statuses";

export async function getPostByBlogIdHanlder(req: Request, res:Response) {
  const query: QueryInputForPagination = req.query

  const post = await blogsService.getPostByBlogId(req.params.id, query)
  if(!post) {
    return res.sendStatus(HttpStatuses.NotFound)
  }
  res.status(HttpStatuses.Success).send(post)
}