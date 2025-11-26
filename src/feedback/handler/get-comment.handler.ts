import {Request, Response} from "express";
import {commentsService} from "../service/comments.service";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {HttpStatuses} from "../../common/types/http-statuses";

export async function getCommentByIdHandler (req: Request, res: Response) {
  const comment = await commentsService.getCommentById(req.params.id);
  if(comment.status !== ResultStatus.Success) {
    return res.status(mapResultCodeToHttpExtension(comment.status)).send(comment.extensions)
  }

  res.status(HttpStatuses.NoContent).send(comment);
}