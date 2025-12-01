import { Request, Response } from "express";
import {blogsService} from "../../blogs/service/blogs.service";
import {QueryInputForPagination} from "../../common/types/input/query-input-for-pagination";
import {HttpStatuses} from "../../common/types/http-statuses";
import {postsQueryRepository} from "../repository/posts-query-repository";
import {valuesPaginationMaper} from "../../blogs/mapper/post-for-blog-mapper";

export async function getPostByBlogIdHanlder(req: Request, res:Response) {

  const query = valuesPaginationMaper(req.query);

  const post = await postsQueryRepository.getPostByBlogId(req.params.id, query)
  if(!post) {
    return res.sendStatus(HttpStatuses.NotFound)
  }
  res.status(HttpStatuses.Success).send(post)
}