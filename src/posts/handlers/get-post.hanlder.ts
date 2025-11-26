import { Request, Response } from "express";
import {mapToPostViewModel} from "../mapper/map-to-post-view-model";
import {postsService} from "../service/posts.service";
import {HttpStatuses} from "../../common/types/http-statuses";

export async function getPostHandler(req: Request, res: Response) {
  try {
    const post = await postsService.getPostById(req.params.id);

    if (!post) {
      return res.sendStatus(HttpStatuses.NotFound);
    }

    const postViewModel = mapToPostViewModel(post)
    res.status(HttpStatuses.Success).send(postViewModel);
  } catch (e: unknown) {
    return res.sendStatus(HttpStatuses.ServerError)
  }
}

