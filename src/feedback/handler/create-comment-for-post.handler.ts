import { Request, Response } from "express";
import {HttpStatuses} from "../../common/types/http-statuses";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {commentsService} from "../service/comments.service";

export async function createCommentForPostHandler(req: Request, res: Response) {
  const user = req.user
  const content = req.body.content

  if(!user) {
    return res.sendStatus(HttpStatuses.NotFound);
  }

  if (!content) {
    return res.sendStatus(HttpStatuses.BadRequest);
  }
  const createdComment = await commentsService.createCommentForPost(user, content)

  if (createdComment.status !== ResultStatus.Created) {
    return res.status(mapResultCodeToHttpExtension(createdComment.status)).send(createdComment.extensions)
  }
  return res.status(HttpStatuses.Created).send(createdComment)
}