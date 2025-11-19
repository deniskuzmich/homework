import {Request, Response} from "express";
import {HTTP_STATUSES} from "../../core/http_statuses/http_statuses";
import {commentsService} from "../service/comments.service";

export async function getCommentByIdHandler (req: Request, res: Response) {
  const feedBack = await commentsService.getCommentById(req.params.id, req.params);
  res.status(HTTP_STATUSES.CREATED_201).send(feedBack);
}