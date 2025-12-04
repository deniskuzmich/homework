import { Request, Response } from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {postsQueryRepository} from "../repository/posts-query-repository";
import {valuesPaginationMaper} from "../../blogs/mapper/post-for-blog-mapper";

export async function getPostByBlogIdHanlder(req: Request, res:Response) {
  const query = valuesPaginationMaper(req.query);
  if(!req.params.id) return null;

  const post = await postsQueryRepository.getPostByBlogId(req.params.id, query)
  if(!post) {
    return res.sendStatus(HttpStatuses.NotFound)
  }
  res.status(HttpStatuses.Success).send(post)
}