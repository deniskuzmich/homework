import { Request, Response } from "express";
import { postsRepository } from "../../respositories/posts-repository";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";

export async function getPostHandler(req: Request, res: Response) {
  try {
    const post = postsRepository.getPostById(req.params.id);

    if (!post) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }

    res.status(HTTP_STATUSES.OK_200).send(post);

  } catch (e: unknown) {
    res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
  }
}

