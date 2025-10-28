import { Request, Response } from "express";
import { postsRepository } from "../../respositories/posts-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";
import {mapToPostViewModel} from "../mappers/map-to-post-view-model";

export async function getPostsListHanlder(req: Request, res: Response) {
  try {
    const foundPosts = await postsRepository.findPosts();
    const blogsViewModel = foundPosts.map(mapToPostViewModel)
    res.status(HTTP_STATUSES.OK_200).send(blogsViewModel);
  } catch (e: unknown) {
    res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
  }
}
