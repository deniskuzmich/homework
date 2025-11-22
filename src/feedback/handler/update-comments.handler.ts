import {Request, Response} from "express";
import {commentsService} from "../service/comments.service";
import {HttpStatuses} from "../../common/types/http-statuses";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";

export async function updateCommentsHandler(req: Request, res: Response) {
  const updatedComment = await commentsService.updateComment(req.params.id, req.body.content);
  if (updatedComment.status !== ResultStatus.NoContent) {
    return res.status(mapResultCodeToHttpExtension(updatedComment.status)).send(updatedComment.extensions)
  }
  res.sendStatus(HttpStatuses.NoContent);
}

//VALIATION