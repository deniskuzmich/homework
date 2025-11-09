import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../core/http_statuses/http_statuses";
import {postsService} from "../service/posts.service";
import {OutputTypeWithPagination} from "../../common/types/blog-output-with-pagintaion.type";
import {PostOutput} from "../types/main-types/post-output.type";
import {BlogQueryInputWithoutSearch} from "../../blogs/types/input-types/blog-query-input-without-search";

export async function getPostsListHanlder(req: Request, res: Response) {

  const query: BlogQueryInputWithoutSearch = req.query
  const foundPosts:OutputTypeWithPagination<PostOutput> = await postsService.findPosts(query);

  res.status(HTTP_STATUSES.OK_200).send(foundPosts);

}
