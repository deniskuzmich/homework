import { Request, Response } from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {postsQueryRepository} from "../repository/posts-query-repository";

export async function getPostHandler(req: Request, res: Response) {
  try {
    const post = await postsQueryRepository.getPostById(req.params.id);
    if (!post) {
      return res.sendStatus(HttpStatuses.NotFound);
    }
    res.status(HttpStatuses.Success).send(post);
  } catch (e: unknown) {
    return res.sendStatus(HttpStatuses.ServerError)
  }
}

