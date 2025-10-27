import { Request, Response } from "express";
import { postsRepository } from "../../respositories/posts-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";

export async function getPostsListHanlder(req: Request, res: Response) {
  try {
    const foundPosts = await postsRepository.findPosts();
    res.status(HTTP_STATUSES.OK_200).send(foundPosts);
  } catch (e: unknown) {
    res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
  }
}
