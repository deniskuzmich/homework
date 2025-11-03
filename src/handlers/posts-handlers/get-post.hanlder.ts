import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../http_statuses/http_statuses";
import {mapToPostViewModel} from "../mappers/map-to-post-view-model";
import {postsService} from "../../application/posts.service";

export async function getPostHandler(req: Request, res: Response) {
  try {
    const post = await postsService.getPostById(req.params.id);

    if (!post) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }

    const postViewModel = mapToPostViewModel(post)
    res.status(HTTP_STATUSES.OK_200).send(postViewModel);
  } catch (e: unknown) {
    return res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR_500)
  }
}

