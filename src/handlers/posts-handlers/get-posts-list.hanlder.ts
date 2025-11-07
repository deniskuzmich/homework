import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../core/http_statuses/http_statuses";
import {mapToPostViewModel} from "../../mappers/posts-mappers/map-to-post-view-model";
import {postsService} from "../../application/posts.service";
import {Post} from "../../core/types/posts-types/posts-types";
import {inputPagination} from "../blogs-hadlers/get-post-by-blog";
import {OutputTypeWithPagination} from "../../common/blog-output-with-pagintaion.type";
import {PostOutput} from "../../core/types/posts-types/post-output.type";

export async function getPostsListHanlder(req: Request, res: Response) {

  const query: inputPagination = req.query
  const foundPosts:OutputTypeWithPagination<PostOutput> = await postsService.findPosts(query);

  res.status(HTTP_STATUSES.OK_200).send(foundPosts);

  // try {
  //   const blogsViewModel = foundPosts.map(mapToPostViewModel)
  //   res.status(HTTP_STATUSES.OK_200).send(blogsViewModel);
  // } catch (e: unknown) {
  //   res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
  // }
}
