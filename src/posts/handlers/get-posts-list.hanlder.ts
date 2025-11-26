import { Request, Response } from "express";
import { ResultStatus } from "../../common/types/result.status";
import {postsService} from "../service/posts.service";
import {OutputTypeWithPagination} from "../../common/types/output-with-pagintaion.type";
import {PostOutput} from "../types/main-types/post-output.type";
import {QueryInputForPagination} from "../../common/types/input/query-input-for-pagination";
import {HttpStatuses} from "../../common/types/http-statuses";

export async function getPostsListHanlder(req: Request, res: Response) {

  const query: QueryInputForPagination = req.query
  const foundPosts:OutputTypeWithPagination<PostOutput> = await postsService.findPosts(query);

  res.status(HttpStatuses.Success).send(foundPosts);

}
