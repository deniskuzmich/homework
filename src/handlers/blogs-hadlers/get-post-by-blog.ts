import {Post} from "../../core/types/posts-types/posts-types";
import { Request, Response } from "express";
import {SortDirection} from "mongodb";
import {blogsService} from "../../application/blogs.service";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";

export type inputPagination = {
  pageNumber?: string,
  pageSize?: string,
  sortBy?: string,
  sortDirection?: SortDirection,
}

export async function getPostByBlogIdHanlder(req: Request, res:Response) {
  const query: inputPagination = req.query

  const posts = await blogsService.getPostByBlogId(req.params.id, query)
  if(!posts) {
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
  res.status(HTTP_STATUSES.OK_200).send(posts)
}